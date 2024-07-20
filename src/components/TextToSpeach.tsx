import { useVoices } from "$/context/VoicesContext"
import { ElementProps } from "kaioken"
import { PlayIcon } from "./icons/PlayIcon"
import { StopIcon } from "./icons/StopIcon"

export const TextToSpeech = ({
  inputText,
  ...props
}: { inputText: string } & ElementProps<"button">) => {
  const { utterance, setUtterance, createUtterance } = useVoices()
  return (
    <button
      onclick={() => {
        if (utterance?.text === inputText) {
          window.speechSynthesis.cancel()
          setUtterance(null)
          return
        }
        createUtterance(inputText)
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
