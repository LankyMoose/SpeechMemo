import { SpeechContext } from "$/context/SpeechContext"
import { useTodos } from "$/context/TodosContext"
import { signal, useState } from "kaioken"

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )

export function SpeechProvider(props: {
  children: JSX.Children
  onRecordedValue: () => void
}) {
  const { addTodo } = useTodos()
  const [speech, setSpeech] = useState<SpeechRecognition | null>(null)
  const output = signal<string | null>(null)
  const [recording, setRecording] = useState(false)

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    return <p>Speech recognition not supported</p>
  }

  const startSpeechRecognition = () => {
    const newSpeech = new SpeechRecognition()
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
      //console.log("result", newOutput)
      output.value = newOutput || null
    })
    newSpeech.addEventListener("start", () => {
      setSpeech(newSpeech)
      setRecording(true)
    })
    newSpeech.addEventListener("end", () => {
      console.log("end", output)
      setSpeech(null)
      setRecording(false)
      if (output.value !== null) {
        console.log("onRecordedValue")
        addTodo({ text: output.value })
        props.onRecordedValue()
      }
    })
  }

  const onNewTodoAnimationCompleted = () => {
    console.log("onNewTodoAnimationCompleted")
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
