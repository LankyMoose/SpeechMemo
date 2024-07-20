import { AudioMuteIcon } from "./icons/AudioMuteIcon"
import { AudioMinIcon } from "./icons/AudioMinIcon"
import { AudioMedIcon } from "./icons/AudioMedIcon"
import { AudioMaxIcon } from "./icons/AudioMaxIcon"
import { useVoices } from "$/context/VoicesContext"

export function VolumeSelector() {
  const { volume, setVolume } = useVoices()

  return (
    <div className="flex gap-2 items-center ">
      <button>
        {volume === 0 ? (
          <AudioMuteIcon width="2rem" height="2rem" />
        ) : volume < 0.1 ? (
          <AudioMinIcon width="2rem" height="2rem" />
        ) : volume < 0.5 ? (
          <AudioMedIcon width="2rem" height="2rem" />
        ) : (
          <AudioMaxIcon width="2rem" height="2rem" />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        oninput={(e) => setVolume(e.target.value)}
      />
    </div>
  )
}
