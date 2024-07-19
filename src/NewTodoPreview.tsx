import { Transition } from "kaioken"
import { EllipsisIcon } from "./EllipsisIcon"
import { useSpeech } from "./SpeechContext"
import { useTodos } from "./TodosProvider"

export function NewTodoPreview() {
  const { addTodo } = useTodos()
  const { output, finished, setOutput } = useSpeech()

  return (
    <Transition
      in={!finished}
      //in={true}
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
            className="p-4 bg-emerald-600 my-shadow text-emerald-50 transition-all absolute top-0 mx-4 pointer-events-none rounded-lg"
          >
            {output === null || output.trim() === "" ? (
              <EllipsisIcon
                width="1.5rem"
                height="1.5rem"
                className="text-neutral-200"
              />
            ) : (
              output
            )}
          </div>
        )
      }}
      onTransitionEnd={(state) => {
        if (state === "exited" && output !== null && output.trim() !== "") {
          addTodo({ text: output })
          setOutput(null)
        }
      }}
    />
  )
}
