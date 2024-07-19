import { createContext, useContext, useState, useEffect } from "kaioken"

interface VoicesCtx {
  inputText: string
  setInputText: (text: string) => void
  synth: SpeechSynthesis
  voices: SpeechSynthesisVoice[]
  selectedVoice: SpeechSynthesisVoice | null
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void
  utterance: SpeechSynthesisUtterance | null
  setUtterance: (utterance: SpeechSynthesisUtterance | null) => void
}

const VoicesContext = createContext<VoicesCtx>({
  inputText: "",
  setInputText: () => {},
  synth: null as any as SpeechSynthesis,
  voices: [],
  selectedVoice: null,
  setSelectedVoice: () => {},
  utterance: null,
  setUtterance: () => {},
})
export const useVoices = () => useContext(VoicesContext)

export const VoicesContextProvider = ({
  children,
  synth,
}: {
  children?: JSX.Children
  synth: SpeechSynthesis
}) => {
  const [inputText, setInputText] = useState<string>("")
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null)
  const [voices, setVoices] = useState(synth.getVoices())
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  )
  useEffect(() => {
    synth.addEventListener("voiceschanged", () => {
      console.log("voices changed")
      setVoices(synth.getVoices())
    })

    window.addEventListener("beforeunload", () => {
      utterance?.dispatchEvent(new Event("end"))
      synth.cancel()
    })
  }, [])

  return (
    <VoicesContext.Provider
      value={{
        inputText,
        setInputText,
        synth,
        voices,
        selectedVoice,
        setSelectedVoice,
        utterance,
        setUtterance,
      }}
    >
      {children}
    </VoicesContext.Provider>
  )
}
