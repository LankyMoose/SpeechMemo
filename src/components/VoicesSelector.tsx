import { useVoices } from "$/context/VoicesContext"
import { Transition } from "kaioken"

export const VoiceSelector = () => {
  const {
    voices,
    selectedVoice,
    setSelectedVoice,
    selectorOpen,
    setSelectorOpen,
  } = useVoices()

  return (
    <Transition
      in={selectorOpen}
      element={(state) => {
        if (state === "exited") return null
        if (state === "entered") {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = "auto"
        }
        return (
          <div
            style={{
              opacity: state === "entered" ? "1" : "0",
              translate: `0 ${state === "entered" ? "0" : "-100%"}`,
              overflowY: state === "entered" ? "auto" : "hidden",
            }}
            className="z-[9999999999] fixed top-0 w-screen max-h-screen max-w-full transition-all bg-[#000b] backdrop-blur flex flex-col p-[2px] gap-[2px] rounded-b-md"
          >
            {voices.map((voice) => (
              <button
                key={voice.name}
                className={`${
                  voice === selectedVoice
                    ? "text-emerald-200"
                    : "text-emerald-50"
                } text-sm hover:text-emerald-200 text-nowrap bg-[#ffffff05] px-4 py-2 rounded-md`}
                onclick={() => {
                  setSelectedVoice(voice)
                  setSelectorOpen(false)
                }}
              >
                {voice.name}
              </button>
            ))}
          </div>
        )
      }}
    />
  )

  // return (
  //   <select
  //     value={selectedVoice?.name ?? ""}
  //     onchange={(e) => {
  //       const voice = voices.find((v) => v.name === e.target.value)
  //       if (!voice) return console.error("Voice not found")
  //       setSelectedVoice(voice)
  //     }}
  //   >
  //     <option value="">Select a voice</option>
  //     {voices.map((voice) => (
  //       <option key={voice.name} value={voice.name}>
  //         {voice.name}
  //       </option>
  //     ))}
  //   </select>
  // )
}
