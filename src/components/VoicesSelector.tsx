import { useVoices } from "$/context/VoicesContext"
import { Transition, useEffect, useRef } from "kaioken"

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
        const ref = useRef<HTMLDivElement | null>(null)
        if (state === "exited") return null
        useEffect(() => {
          if (state === "entered") {
            document.body.style.overflow = "hidden"
            const handler = (e: Event) => {
              if (ref.current && !ref.current.contains(e.target as Node)) {
                setSelectorOpen(false)
              }
            }
            document.addEventListener("click", handler)
            return () => document.removeEventListener("click", handler)
          } else {
            document.body.style.overflow = "auto"
          }
        }, [state])
        return (
          <div
            ref={ref}
            style={{
              opacity: state === "entered" ? "1" : "0",
              translate: `0 ${state === "entered" ? "0" : "100%"}`,
              overflowY: state === "entered" ? "auto" : "hidden",
            }}
            className="z-[9999999999] fixed right-0 sm:rounded-lg sm:right-16 bottom-0 sm:bottom-16 w-screen max-w-screen sm:w-[400px] h-screen max-h-screen sm:max-h-[600px] transition-all bg-[#000b] backdrop-blur flex flex-col p-[2px] gap-[2px]"
          >
            {voices.map((voice) => (
              <button
                key={voice.name}
                className={`${
                  voice === selectedVoice ? "text-blue-300" : "text-indigo-50"
                } text-sm hover:text-blue-300 text-nowrap bg-[#ffffff05] px-4 py-2 rounded-md`}
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
