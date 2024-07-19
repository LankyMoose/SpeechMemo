import { createContext, useContext, useState } from "kaioken"

export const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition

interface SpeechRecognitionCtx {
  speech: SpeechRecognition | null
  setSpeech: (speechRecognition: SpeechRecognition | null) => void
  output: string | null
  setOutput: (output: string | null) => void
  finished: boolean
  setFinished: (finished: boolean) => void
}

const SpeechContext = createContext<SpeechRecognitionCtx>({
  speech: null,
  setSpeech: () => {},
  output: null,
  setOutput: () => {},
  finished: true,
  setFinished: () => {},
})
export const useSpeech = () => useContext(SpeechContext)

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
