import { useVoices } from "$/context/VoicesContext"

export const VoiceSelector = () => {
  const { voices, selectedVoice, setSelectedVoice } = useVoices()

  return (
    <select
      value={selectedVoice?.name ?? ""}
      onchange={(e) => {
        const voice = voices.find((v) => v.name === e.target.value)
        if (!voice) return console.error("Voice not found")
        setSelectedVoice(voice)
      }}
    >
      <option value="">Select a voice</option>
      {voices.map((voice) => (
        <option key={voice.name} value={voice.name}>
          {voice.name}
        </option>
      ))}
    </select>
  )
}
