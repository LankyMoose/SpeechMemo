import { createContext, useContext } from "kaioken"

interface VoicesCtx {
  selectorOpen: boolean
  setSelectorOpen: (open: boolean) => void
  voices: SpeechSynthesisVoice[]
  selectedVoice: SpeechSynthesisVoice | null
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void
  utterance: SpeechSynthesisUtterance | null
  setUtterance: (utterance: SpeechSynthesisUtterance | null) => void
}

export const VoicesContext = createContext<VoicesCtx>(null as any)
export const useVoices = () => useContext(VoicesContext)
