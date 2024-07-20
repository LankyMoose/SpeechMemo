import { createContext, useContext } from "kaioken"

export const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition

interface SpeechRecognitionCtx {
  speech: SpeechRecognition | null
  setSpeech: (speechRecognition: SpeechRecognition | null) => void
  output: string | null
  setOutput: (output: string | null) => void
  recording: boolean
  setRecording: (finished: boolean) => void
}

export const SpeechContext = createContext<SpeechRecognitionCtx>({
  speech: null,
  setSpeech: () => {},
  output: null,
  setOutput: () => {},
  recording: false,
  setRecording: () => {},
})
export const useSpeech = () => useContext(SpeechContext)
