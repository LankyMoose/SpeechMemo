import { SpeechProvider } from "./components/SpeechProvider"
import { RecordButton } from "./components/RecordButton"
import { TodoList } from "./components/TodoList"
import { TodosProvider } from "./components/TodosProvider"
import { NewTodoPreview } from "./components/NewTodoPreview"
import { VoicesProvider } from "./components/VoicesProvider"
import { VoiceSelector } from "./components/VoicesSelector"
import { VolumeSelector } from "./components/VolumeSelector"

export function App() {
  const scrollToTop = () => {
    document.scrollingElement?.scrollTo(0, 0)
  }

  return (
    <VoicesProvider>
      <TodosProvider>
        <SpeechProvider onRecordedValue={scrollToTop}>
          <header className="w-full sticky top-0 flex justify-between items-center p-2 z-[999999999999999]">
            <VolumeSelector />
            <VoiceSelector />
          </header>
          <main className="flex flex-col flex-grow h-full w-full">
            <div className="flex-grow">
              <TodoList />
            </div>
          </main>
          <footer className="w-full sticky bottom-0 flex items-center p-4 justify-center z-[99999]">
            <NewTodoPreview />
            <RecordButton />
          </footer>
        </SpeechProvider>
      </TodosProvider>
    </VoicesProvider>
  )
}
