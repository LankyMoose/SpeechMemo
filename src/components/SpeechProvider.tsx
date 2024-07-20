import { SpeechContext } from "$/context/SpeechContext"
import { useState } from "kaioken"

export const SpeechProvider: Kaioken.FC = ({ children }) => {
  const [speech, setSpeech] = useState<SpeechRecognition | null>(null)
  const [output, setOutput] = useState<string | null>(null)
  const [finished, setFinished] = useState(true)
  return (
    <SpeechContext.Provider
      value={{ speech, setSpeech, output, setOutput, finished, setFinished }}
    >
      {children}
    </SpeechContext.Provider>
  )
}
