import { VoicesContext } from "$/context/VoicesContext"
import { useEffect, useState } from "kaioken"

export function VoicesProvider({ children }: { children: JSX.Children }) {
  if (!window.speechSynthesis) {
    return <p>Speech synthesis not supported</p>
  }
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [voices, setVoices] = useState(window.speechSynthesis.getVoices())
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  )

  useEffect(() => {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      const _voices = window.speechSynthesis.getVoices()
      setVoices(_voices)
      setSelectedVoice(_voices[0])
    })

    window.addEventListener("beforeunload", () => {
      utterance?.dispatchEvent(new Event("end"))
      window.speechSynthesis.cancel()
    })
  }, [])

  return (
    <VoicesContext.Provider
      value={{
        selectorOpen,
        setSelectorOpen,
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
