import { Transition } from "kaioken"
import { useSpeech } from "$/context/SpeechContext"

export function NewTodoPreview() {
  const { output, recording, onNewTodoAnimationCompleted } = useSpeech()

  return (
    <Transition
      in={recording}
      element={(state) => {
        if (state === "exited") return null
        const opacity = state === "entered" ? "1" : "0"
        const translateY =
          state === "entered"
            ? "-100%"
            : state === "exiting" && output !== null
            ? "calc(-100vh + 100px)"
            : "0%"
        return (
          <div
            style={{
              opacity,
              translate: `0 ${translateY}`,
              textShadow: "1px 1px 1px #222a",
            }}
            className="p-4 bg-emerald-600 custom-shadow text-emerald-50 transition-all absolute top-0 mx-4 pointer-events-none rounded-lg"
          >
            {output === null ? (
              <div className="ellipsis">
                <div style="--delay: 100ms"></div>
                <div style="--delay: 200ms"></div>
                <div style="--delay: 300ms"></div>
              </div>
            ) : (
              output
            )}
          </div>
        )
      }}
      onTransitionEnd={(state) => {
        if (state === "exited") {
          onNewTodoAnimationCompleted()
        }
      }}
    />
  )
}
