import { createContext, useContext } from "kaioken"

interface VoicesCtx {
  selectorOpen: boolean
  setSelectorOpen: (open: boolean) => void
  voices: SpeechSynthesisVoice[]
  selectedVoice: SpeechSynthesisVoice | null
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void
  setUtterance: (utterance: SpeechSynthesisUtterance | null) => void
  volume: number
  setVolume: (volume: string) => void
  muted: boolean
  setMuted: (muted: boolean) => void
  createUtterance: (text: string, onFinish?: () => void) => void
}

export const VoicesContext = createContext<VoicesCtx>(null as any)
export const useVoices = () => useContext(VoicesContext)
