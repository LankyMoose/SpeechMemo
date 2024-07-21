import { useEffect, useState } from "kaioken"
import { VoicesContext } from "$/context/VoicesContext"
import { storage } from "$/storage"

export function VoicesProvider({ children }: { children: JSX.Children }) {
  if (!window.speechSynthesis) {
    return <p>Speech synthesis not supported</p>
  }
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [voices, setVoices] = useState(window.speechSynthesis.getVoices())
  const [languages, setLanguages] = useState<string[]>([])
  const [language, setLanguage] = useState("")
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  )
  const [volume, setVolume] = useState(
    parseFloat(storage.get("volume") || "0.5")
  )
  const setVolumeLocal = (volume: string) => {
    storage.set("volume", volume)
    setVolume(parseFloat(volume))
  }
  const [muted, setMuted] = useState(storage.get("muted") === "true")
  const setMutedLocal = (muted: boolean) => {
    storage.set("muted", muted ? "true" : "false")
    setMuted(muted)
  }

  useEffect(() => {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      const voices = window.speechSynthesis.getVoices()
      // get a list of distinct languages
      const languages = voices
        .map((voice) => voice.lang)
        .filter((lang, index, self) => self.indexOf(lang) === index)
      const savedSetting = storage.get("selectedVoice")
      const voice =
        voices.find((voice) => voice.name === savedSetting) || voices[0]

      setLanguage(voice?.lang || window.navigator.language)
      setVoices(voices)
      setSelectedVoice(voice)
      setLanguages(languages)
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

  const createUtterance = (text: string, onFinish?: () => void) => {
    try {
      console.log("createUtterance", text)
      if (utterance) {
        window.speechSynthesis.cancel()
      }
      const newUtterance = new SpeechSynthesisUtterance(text)
      newUtterance.voice = selectedVoice
      newUtterance.volume = muted ? 0 : volume
      newUtterance.rate = 1
      newUtterance.addEventListener("end", () => {
        setUtterance(null)
        onFinish?.()
      })
      setUtterance(newUtterance)
      window.speechSynthesis.speak(newUtterance)
    } catch (error) {
      console.error(
        "[SpeechMemo]: an error occurred during createUtterance()",
        error
      )
    }
  }

  return (
    <VoicesContext.Provider
      value={{
        selectorOpen,
        setSelectorOpen,
        voices,
        selectedVoice,
        languages,
        language,
        setLanguage,
        setSelectedVoice: setSelectedVoiceLocal,
        setUtterance,
        volume,
        setVolume: setVolumeLocal,
        muted,
        setMuted: setMutedLocal,
        createUtterance,
      }}
    >
      {children}
    </VoicesContext.Provider>
  )
}
