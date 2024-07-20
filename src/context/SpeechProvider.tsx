import { signal, useState } from "kaioken"
import { SpeechContext } from "$/context/SpeechContext"
import { useTodos } from "$/context/TodosContext"
import { ErrorDisplay } from "$/components/ErrorDisplay"
import { isMobile, isBraveDesktop, microphonePermissionState } from "$/support"

export function SpeechProvider(props: {
  children: JSX.Children
  onRecordedValue: () => void
}) {
  const { addTodo } = useTodos()
  const [speech, setSpeech] = useState<SpeechRecognition | null>(null)
  const output = signal<string | null>(null)
  const [recording, setRecording] = useState(false)

  if (isBraveDesktop) {
    return (
      <ErrorDisplay>
        <p className="mb-8">
          Brave Desktop does not support speech recognition 😭
        </p>
        <small>Try another browser!</small>
      </ErrorDisplay>
    )
  }
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    return (
      <ErrorDisplay>
        <p className="mb-8">Speech recognition not supported 😭</p>
        <small>Try another browser!</small>
      </ErrorDisplay>
    )
  }

  if (microphonePermissionState.value === "denied") {
    return (
      <ErrorDisplay>
        <p className="mb-8">Microphone permission denied 😭</p>
        <small>
          SpeechMemo requires microphone access to function. It only records
          while you hold down the red button. Please enable microphone
          permissions!
        </small>
      </ErrorDisplay>
    )
  }

  const startSpeechRecognition = () => {
    const micPerm = microphonePermissionState.value
    const newSpeech = new SpeechRecognition()
    newSpeech.addEventListener("error", (event) => {
      // handle prompt-abort scenario
      if (micPerm === "prompt" && event.error === "aborted") {
        return
      }
      //alert(`Oops! An error occurred:\n${event.error}`)
      setSpeech(null)
      setRecording(false)
    })
    newSpeech.continuous = true
    newSpeech.interimResults = !isMobile
    newSpeech.addEventListener("result", (event) => {
      const newOutput = Array.from(event.results)
        .filter((result) => !isMobile || result.isFinal)
        .map((result) => result[0].transcript)
        .filter(Boolean)
        .join(" ")
        .trim()
      output.value = newOutput || null
    })
    newSpeech.addEventListener("start", () => {
      // if the user had to respond to a prompt, abort the recording
      if (micPerm === "prompt") {
        newSpeech.abort()
        return
      }
      setSpeech(newSpeech)
      setRecording(true)
    })
    newSpeech.addEventListener("end", () => {
      setSpeech(null)
      setRecording(false)
      if (output.value !== null) {
        addTodo({ text: output.value })
        props.onRecordedValue()
      }
    })
    newSpeech.start()
  }

  const onNewTodoAnimationCompleted = () => {
    output.value = null
  }

  return (
    <SpeechContext.Provider
      value={{
        output: output.value,
        speech,
        setSpeech,
        recording,
        setRecording,
        startSpeechRecognition,
        onNewTodoAnimationCompleted,
      }}
    >
      {props.children}
    </SpeechContext.Provider>
  )
}
