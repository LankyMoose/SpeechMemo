import { Transition } from "kaioken"
import { useTodos } from "$/context/TodosContext"
import { TodoItem } from "./TodoItem"

export function TodoList() {
  const { todos, deleteTodo, playingTodo } = useTodos()

  return (
    <ul className="p-4 flex flex-col gap-4 overflow-hidden w-screen max-w-screen-md mx-auto">
      {todos.map((todo, idx) => (
        <Transition
          key={todo.id}
          in={!todo.deleting}
          onTransitionEnd={(state) => {
            if (state === "exited") {
              if (playingTodo?.id === todo.id) {
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
