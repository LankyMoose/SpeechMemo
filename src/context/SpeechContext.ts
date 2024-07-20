import { createContext, useContext } from "kaioken"

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

export const SpeechContext = createContext<SpeechRecognitionCtx>({
  speech: null,
  setSpeech: () => {},
  output: null,
  setOutput: () => {},
  finished: true,
  setFinished: () => {},
})
export const useSpeech = () => useContext(SpeechContext)
