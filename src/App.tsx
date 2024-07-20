import { SpeechProvider } from "./components/SpeechProvider"
import { RecordButton } from "./components/RecordButton"
import { TodoList } from "./components/TodoList"
import { TodosProvider } from "./components/TodosProvider"
import { NewTodoPreview } from "./components/NewTodoPreview"
import { VoicesProvider } from "./components/VoicesProvider"
import { VoiceSelector } from "./components/VoicesSelector"

export function App() {
  const scrollToTop = () => {
    document.scrollingElement?.scrollTo(0, 0)
  }

  return (
    <VoicesProvider>
      <TodosProvider>
        <SpeechProvider onRecordedValue={scrollToTop}>
          <main className="flex flex-col flex-grow h-full w-full">
            <div className="flex-grow">
              <TodoList />
            </div>
            <footer className="w-full sticky bottom-0 flex h-[80px] items-center p-2 justify-center z-[99999]">
              <NewTodoPreview />
              <RecordButton />
              <div className="fixed right-8">
                <VoiceSelector />
              </div>
            </footer>
          </main>
        </SpeechProvider>
      </TodosProvider>
    </VoicesProvider>
  )
}
