import { SpeechContext } from "$/context/SpeechContext"
import { useTodos } from "$/context/TodosContext"
import { signal, useState } from "kaioken"
import { isMobile, isBraveDesktop } from "$/support"
import { ErrorDisplay } from "./ErrorDisplay"

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
        <p>Try another browser!</p>
      </ErrorDisplay>
    )
  }
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    return (
      <ErrorDisplay>
        Speech recognition not supported 😭. Try another browser!
      </ErrorDisplay>
    )
  }

  const startSpeechRecognition = () => {
    const newSpeech = new SpeechRecognition()
    newSpeech.addEventListener("error", (event) => {
      alert(`Oops! An error occurred:\n${event.error}`)
      setSpeech(null)
      setRecording(false)
    })
    newSpeech.continuous = true
    newSpeech.interimResults = !isMobile
    newSpeech.start()
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
