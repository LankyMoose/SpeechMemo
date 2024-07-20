import { createContext, useContext } from "kaioken"

export const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition

interface SpeechRecognitionCtx {
  speech: SpeechRecognition | null
  setSpeech: (speechRecognition: SpeechRecognition | null) => void
  output: string | null
  recording: boolean
  setRecording: (finished: boolean) => void
  startSpeechRecognition: () => void
  onNewTodoAnimationCompleted: () => void
}

export const SpeechContext = createContext<SpeechRecognitionCtx>(null as any)
export const useSpeech = () => useContext(SpeechContext)
