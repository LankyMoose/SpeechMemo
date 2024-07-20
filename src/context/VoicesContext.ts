import { createContext, useContext } from "kaioken"

interface VoicesCtx {
  voices: SpeechSynthesisVoice[]
  selectedVoice: SpeechSynthesisVoice | null
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void
  utterance: SpeechSynthesisUtterance | null
  setUtterance: (utterance: SpeechSynthesisUtterance | null) => void
}

export const VoicesContext = createContext<VoicesCtx>({
  voices: [],
  selectedVoice: null,
  setSelectedVoice: () => {},
  utterance: null,
  setUtterance: () => {},
})
export const useVoices = () => useContext(VoicesContext)
