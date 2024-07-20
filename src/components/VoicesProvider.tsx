import { VoicesContext } from "$/context/VoicesContext"
import { useEffect, useState } from "kaioken"

export function VoicesProvider({ children }: { children: JSX.Children }) {
  if (!window.speechSynthesis) {
    return <p>Speech synthesis not supported</p>
  }
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null)
  const [voices, setVoices] = useState(window.speechSynthesis.getVoices())
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  )

  useEffect(() => {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      setVoices(window.speechSynthesis.getVoices())
    })

    window.addEventListener("beforeunload", () => {
      utterance?.dispatchEvent(new Event("end"))
      window.speechSynthesis.cancel()
    })
  }, [])

  return (
    <VoicesContext.Provider
      value={{
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
