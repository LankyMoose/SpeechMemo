import { SpeechContext } from "$/context/SpeechContext"
import { useState } from "kaioken"

export function SpeechProvider({ children }: { children: JSX.Children }) {
  const [speech, setSpeech] = useState<SpeechRecognition | null>(null)
  const [output, setOutput] = useState<string | null>(null)
  const [finished, setFinished] = useState(true)

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    return <p>Speech recognition not supported</p>
  }

  return (
    <SpeechContext.Provider
      value={{ speech, setSpeech, output, setOutput, finished, setFinished }}
    >
      {children}
    </SpeechContext.Provider>
  )
}