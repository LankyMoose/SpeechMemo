import { VoicesContext } from "$/context/VoicesContext"
import { storage } from "$/storage"
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
      const voices = window.speechSynthesis.getVoices()
      const savedSetting = storage.get("selectedVoice")
      const voice =
        voices.find((voice) => voice.name === savedSetting) || voices[0]
      setVoices(voices)
      setSelectedVoice(voice)
    })

    window.addEventListener("beforeunload", () => {
      utterance?.dispatchEvent(new Event("end"))
      window.speechSynthesis.cancel()
    })
  }, [])

  const setSelectedVoiceLocal = (voice: SpeechSynthesisVoice | null) => {
    storage.set("selectedVoice", voice?.name || "")
    setSelectedVoice(voice)
  }

  return (
    <VoicesContext.Provider
      value={{
        selectorOpen,
        setSelectorOpen,
        voices,
        selectedVoice,
        setSelectedVoice: setSelectedVoiceLocal,
        utterance,
        setUtterance,
      }}
    >
      {children}
    </VoicesContext.Provider>
  )
}
