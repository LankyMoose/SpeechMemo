import { Transition } from "kaioken"
import { useTodos } from "$/context/TodosContext"
import { TodoItem } from "./TodoItem"

export function TodoList() {
  const { todos, deleteTodo, playingTodo } = useTodos()

  return (
    <ul className="p-4 flex flex-col gap-4 overflow-hidden w-full max-w-(--breakpoint-md) mx-auto">
      {todos.value.map((todo, idx) => (
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
              zIndex={todos.peek().length - idx}
              transitionState={state}
            />
          )}
        />
      ))}
    </ul>
  )
}
