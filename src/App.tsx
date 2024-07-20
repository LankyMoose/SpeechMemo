import { Portal, useRef } from "kaioken"
import { SpeechProvider } from "./components/SpeechProvider"
import { RecordButton } from "./components/RecordButton"
import { TodoList } from "./components/TodoList"
import { TodosProvider } from "./components/TodosProvider"
import { NewTodoPreview } from "./components/NewTodoPreview"
import { VoicesProvider } from "./components/VoicesProvider"
import { VoiceSelector } from "./components/VoicesSelector"
import { MicrophoneIcon } from "./components/icons/MicrophoneIcon"
import { useVoices } from "./context/VoicesContext"

export function App() {
  const todoListContainerRef = useRef<HTMLDivElement | null>(null)
  return (
    <VoicesProvider>
      <SpeechProvider>
        <TodosProvider>
          <main className="flex flex-col flex-grow h-full w-full pb-[80px]">
            <div ref={todoListContainerRef} className="flex-grow overflow-auto">
              <TodoList />
            </div>
            <footer className="w-full fixed bottom-0 flex h-[80px] items-center p-2 justify-center z-[99999]">
              <NewTodoPreview />
              <RecordButton
                onRecordedValue={() => {
                  todoListContainerRef.current?.scroll({
                    top: 0,
                    behavior: "smooth",
                  })
                }}
              />
              <div className="fixed right-8">
                <VoicesSelectorToggle />
              </div>
            </footer>
          </main>
          <Portal container={document.getElementById("portal-root")!}>
            <VoiceSelector />
          </Portal>
        </TodosProvider>
      </SpeechProvider>
    </VoicesProvider>
  )
}

function VoicesSelectorToggle() {
  const { selectorOpen, setSelectorOpen } = useVoices()
  return (
    <button onclick={() => setSelectorOpen(!selectorOpen)}>
      <MicrophoneIcon />
    </button>
  )
}
