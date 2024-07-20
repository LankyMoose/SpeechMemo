import { SpeechProvider } from "./context/SpeechProvider"
import { TodosProvider } from "./context/TodosProvider"
import { VoicesProvider } from "./context/VoicesProvider"
import { RecordButton } from "./components/RecordButton"
import { TodoList } from "./components/TodoList"
import { NewTodoPreview } from "./components/NewTodoPreview"
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
          <main className="w-full flex-grow">
            <TodoList />
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
