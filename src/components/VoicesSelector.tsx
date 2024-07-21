import { useVoices } from "$/context/VoicesContext"
import { Portal, Transition, useEffect, useRef } from "kaioken"
import { MicrophoneIcon } from "./icons/MicrophoneIcon"

export function VoiceSelector() {
  const { selectorOpen, setSelectorOpen } = useVoices()
  return (
    <>
      <button
        className="w-12 h-12 rounded-full flex items-center justify-center"
        onclick={() => setSelectorOpen(!selectorOpen)}
      >
        <MicrophoneIcon width="2rem" height="2rem" />
      </button>
      <Portal container={document.getElementById("portal-root")!}>
        <VoiceSelectorMenu />
      </Portal>
    </>
  )
}

function VoiceSelectorMenu() {
  const {
    voices,
    selectedVoice,
    setSelectedVoice,
    selectorOpen,
    setSelectorOpen,
    language,
    languages,
    setLanguage,
  } = useVoices()

  return (
    <Transition
      in={selectorOpen}
      element={(state) => {
        const ref = useRef<HTMLDivElement | null>(null)

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
            document.body.onclick = null
          }
        }, [state])

        if (state === "exited") return null

        return (
          <div
            ref={ref}
            style={{
              opacity: state === "entered" ? "1" : "0",
              translate: `0 ${state === "entered" ? "0" : "-100%"}`,
              overflowY: state === "entered" ? "auto" : "hidden",
              scrollbarWidth: "thin",
            }}
            className="voice-selector z-[9999999999] fixed right-0 sm:right-16 top-0 sm:top-16 sm:rounded-lg transition-all bg-[#000b] backdrop-blur flex flex-col p-[2px] gap-[2px]"
          >
            <div className="sticky top-[-2px]">
              <select
                className="px-4 py-2 w-full"
                onchange={(e) => setLanguage(e.target.value)}
              >
                <option key="" value="">
                  Select a language
                </option>
                {languages.map((lang) => (
                  <option key={lang} value={lang} selected={lang === language}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            {voices
              .filter((voice) => voice.lang === language)
              .map((voice) => (
                <button
                  key={voice.name}
                  className={`truncate-text ${
                    voice === selectedVoice ? "text-blue-300" : "text-indigo-50"
                  } text-sm text-left hover:text-blue-300 text-nowrap bg-[#ffffff05] px-4 py-2 rounded-md`}
                  onclick={() => {
                    setSelectedVoice(voice)
                    setSelectorOpen(false)
                  }}
                >
                  {voice.name}
                </button>
              ))}
            {voices.length === 0 ? (
              <p className="text-center p-4 text-red-400 text-xl">
                No voices found. Check your browser settings.
              </p>
            ) : null}
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
