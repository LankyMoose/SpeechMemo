import { useRef } from "kaioken"
import { SpeechProvider } from "./components/SpeechProvider"
import { RecordButton } from "./components/RecordButton"
import { TodoList } from "./components/TodoList"
import { TodosProvider } from "./components/TodosProvider"
import { NewTodoPreview } from "./components/NewTodoPreview"
import { VoicesProvider } from "./components/VoicesProvider"
import { VoiceSelector } from "./components/VoicesSelector"

export function App() {
  const todoListContainerRef = useRef<HTMLDivElement | null>(null)

  const scrollToTop = () => {
    todoListContainerRef.current?.scroll({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <VoicesProvider>
      <SpeechProvider onRecordedValue={scrollToTop}>
        <TodosProvider>
          <main className="flex flex-col flex-grow h-full w-full pb-[80px]">
            <div ref={todoListContainerRef} className="flex-grow overflow-auto">
              <TodoList />
            </div>
            <footer className="w-full fixed bottom-0 flex h-[80px] items-center p-2 justify-center z-[99999]">
              <NewTodoPreview />
              <RecordButton />
              <div className="fixed right-8">
                <VoiceSelector />
              </div>
            </footer>
          </main>
        </TodosProvider>
      </SpeechProvider>
    </VoicesProvider>
  )
}
