import { useVoices } from "./VoicesContext"

export const TextToSpeech = () => {
  const { synth, selectedVoice, utterance, setUtterance, inputText } =
    useVoices()
  return (
    <div>
      <button
        disabled={!selectedVoice || !inputText}
        onclick={() => {
          if (utterance) synth.cancel()
          const newUtterance = new SpeechSynthesisUtterance(inputText)
          newUtterance.voice = selectedVoice
          newUtterance.addEventListener("end", () => setUtterance(null))
          setUtterance(newUtterance)
          synth.speak(newUtterance)
        }}
      >
        Speak
      </button>
      <button
        disabled={!utterance}
        onclick={() => {
          if (!utterance) return
          synth.cancel()
          setUtterance(null)
        }}
      >
        Stop
      </button>
    </div>
  )
}
