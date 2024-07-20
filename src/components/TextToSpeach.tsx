import { useVoices } from "$/context/VoicesContext"
import { ElementProps } from "kaioken"
import { PlayIcon } from "./icons/PlayIcon"
import { StopIcon } from "./icons/StopIcon"

export const TextToSpeech = ({
  inputText,
  ...props
}: { inputText: string } & ElementProps<"button">) => {
  const { selectedVoice, utterance, setUtterance, volume } = useVoices()
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
        newUtterance.volume = volume
        newUtterance.rate = 1
        newUtterance.addEventListener("end", () => setUtterance(null))
        setUtterance(newUtterance)
        window.speechSynthesis.speak(newUtterance)
      }}
      {...props}
    >
      {utterance?.text === inputText ? (
        <StopIcon width="1.5rem" height="1.5rem" />
      ) : (
        <PlayIcon width="1.5rem" height="1.5rem" />
      )}
    </button>
  )
}
