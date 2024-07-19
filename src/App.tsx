import { SpeechProvider } from "./SpeechContext"
import { RecordButton } from "./RecordButton"
import { useRef } from "kaioken"
import { TodoList } from "./TodoList"
import { TodosProvider } from "./TodosProvider"
import { NewTodoPreview } from "./NewTodoPreview"

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
          <footer className="w-full relative flex h-[100px] items-center p-4 justify-center z-[99999]">
            <NewTodoPreview />
            <RecordButton
              onRecordedValue={() => {
                todoListContainerRef.current?.scroll({
                  top: 0,
                  behavior: "smooth",
                })
              }}
            />
          </footer>
        </main>
      </TodosProvider>
    </SpeechProvider>
  )
}
