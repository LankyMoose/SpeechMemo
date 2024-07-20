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
            <footer className="w-full sticky bottom-0 grid grid-cols-3 items-center p-2 justify-between z-[99999]">
              <div></div>
              <div className="flex-grow flex justify-center items-center">
                <NewTodoPreview />
                <RecordButton />
              </div>
              <div className="flex justify-end items-center pr-4">
                <VoiceSelector />
              </div>
            </footer>
          </main>
        </SpeechProvider>
      </TodosProvider>
    </VoicesProvider>
  )
}
