import { SpeechProvider, useSpeech } from "./SpeechContext"
import { RecordButton } from "./RecordButton"
import { Transition, useRef } from "kaioken"
import { TodoList } from "./TodoList"
import { TodosProvider, useTodos } from "./TodosProvider"

export function App() {
  const todoListContainerRef = useRef<HTMLDivElement | null>(null)
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  if (!window.speechSynthesis || !SpeechRecognition) {
    return <p>Speech synthesis not supported</p>
  }
  return (
    <SpeechProvider>
      <TodosProvider>
        <main className="flex flex-col flex-grow h-full w-full">
          <div
            ref={todoListContainerRef}
            className="flex-grow max-h-[calc(100vh-100px)] overflow-auto"
          >
            <TodoList />
          </div>
          <div className="w-full relative flex h-[100px] items-center p-4 justify-center">
            <NewItemPreview todoListContainerRef={todoListContainerRef} />
            <RecordButton />
          </div>
        </main>
      </TodosProvider>
    </SpeechProvider>
  )
}

function NewItemPreview({
  todoListContainerRef,
}: {
  todoListContainerRef: Kaioken.Ref<HTMLDivElement | null>
}) {
  const { setTodos } = useTodos()
  const { output, finished, setOutput } = useSpeech()

  const addTodo = () => {
    if (output !== null) {
      setTodos((todos) => [
        { id: crypto.randomUUID(), text: output, done: false },
        ...todos,
      ])
      setOutput(null)
      todoListContainerRef.current?.scrollTo(0, 0)
    }
  }

  return (
    <Transition
      in={!finished}
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
              boxShadow: "2px 2px 8px #0004",
            }}
            className="p-4 bg-emerald-500 text-emerald-50 transition-all absolute top-0 mx-4 pointer-events-none rounded-lg"
          >
            {output === null || output.trim() === "" ? "..." : output}
          </div>
        )
      }}
      onTransitionEnd={(state) => {
        if (state === "exited" && output !== null) {
          addTodo()
        }
      }}
    />
  )
}
