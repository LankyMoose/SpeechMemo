import { useVoices } from "$/context/VoicesContext"
import { AudioIcon } from "$/components/icons/AudioIcon"
import { AudioMuteIcon } from "$/components/icons/AudioMuteIcon"

export const TextToSpeech = ({ inputText }: { inputText: string }) => {
  const { selectedVoice, utterance, setUtterance } = useVoices()
  return (
    <button
      onclick={() => {
        if (utterance?.text === inputText) {
          window.speechSynthesis.cancel()
          setUtterance(null)
          return
        } else if (utterance) {
          window.speechSynthesis.cancel()
        }
        const newUtterance = new SpeechSynthesisUtterance(inputText)
        newUtterance.voice = selectedVoice
        newUtterance.rate = 1
        newUtterance.addEventListener("end", () => setUtterance(null))
        setUtterance(newUtterance)
        window.speechSynthesis.speak(newUtterance)
      }}
    >
      {utterance?.text === inputText ? <AudioMuteIcon /> : <AudioIcon />}
    </button>
  )
}
