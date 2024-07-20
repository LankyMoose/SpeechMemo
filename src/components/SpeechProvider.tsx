import { SpeechContext } from "$/context/SpeechContext"
import { useState } from "kaioken"

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )

export function SpeechProvider(props: {
  children: JSX.Children
  onRecordedValue: () => void
}) {
  const [speech, setSpeech] = useState<SpeechRecognition | null>(null)
  const [output, setOutput] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    return <p>Speech recognition not supported</p>
  }

  const startSpeechRecognition = () => {
    const newSpeech = new SpeechRecognition()
    newSpeech.continuous = true
    newSpeech.interimResults = true
    newSpeech.start()
    newSpeech.addEventListener("result", (event) => {
      const output = Array.from(event.results)
        .filter((result) => !isMobile || result.isFinal)
        .map((result) => result[0].transcript)
        .filter(Boolean)
        .join(" ")
        .trim()

      setOutput(output === "" ? null : output)
    })
    newSpeech.addEventListener("start", () => {
      setSpeech(newSpeech)
      setRecording(true)
    })
    newSpeech.addEventListener("end", () => {
      setSpeech(null)
      setRecording(false)
      if (output !== null) {
        props.onRecordedValue()
      }
    })
  }

  return (
    <SpeechContext.Provider
      value={{
        speech,
        setSpeech,
        output,
        setOutput,
        recording,
        setRecording,
        startSpeechRecognition,
      }}
    >
      {props.children}
    </SpeechContext.Provider>
  )
}
