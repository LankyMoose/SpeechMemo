import { Transition } from "kaioken"
import { useTodos } from "$/context/TodosContext"
import { useVoices } from "$/context/VoicesContext"
import { TodoItem } from "./TodoItem"

export function TodoList() {
  const { utterance } = useVoices()
  const { todos, deleteTodo } = useTodos()

  return (
    <ul className="p-4 flex flex-col gap-4 overflow-hidden w-screen max-w-screen-md mx-auto">
      {todos.map((todo, idx) => (
        <Transition
          key={todo.id}
          in={!todo.deleted}
          onTransitionEnd={(state) => {
            if (state === "exited") {
              if (utterance?.text === todo.text) {
                window.speechSynthesis.cancel()
              }
              deleteTodo(todo.id, true)
            }
          }}
          element={(state) => (
            <TodoItem
              todo={todo}
              zIndex={todos.length - idx}
              transitionState={state}
            />
          )}
        />
      ))}
    </ul>
  )
}
