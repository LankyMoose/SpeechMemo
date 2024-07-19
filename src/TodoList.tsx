import { Transition, TransitionState } from "kaioken"
import { useTodos, TodoItem as Todo } from "./TodosProvider"
import { DeleteIcon } from "./DeleteIcon"

export function TodoList() {
  const { todos } = useTodos()

  return (
    <ul className="p-4 flex flex-col gap-4">
      {todos.map((todo) => (
        <Transition
          key={todo.id}
          in={true}
          element={(state) => <TodoItem todo={todo} transitionState={state} />}
        />
      ))}
    </ul>
  )
}

interface TodoItemProps {
  todo: Todo
  transitionState: TransitionState
}

function TodoItem({ todo, transitionState }: TodoItemProps) {
  const { setTodos } = useTodos()

  const deleteTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id))
  }

  const opacity = transitionState === "entered" ? "1" : "0"
  const translateY = transitionState === "entered" ? "0" : "-100%"
  return (
    <li
      style={{ opacity, transform: `translateY(${translateY})` }}
      className="transition-all items-start flex gap-4 p-4 rounded-lg bg-[#333] shadow-md shadow-[#0003]"
    >
      <span className="flex-grow select-none">{todo.text}</span>
      <div className="flex gap-2 items-center">
        <button
          className="text-neutral-300 hover:text-neutral-400"
          onclick={() => deleteTodo(todo.id)}
        >
          <DeleteIcon width="2rem" height="2rem" />
        </button>
      </div>
    </li>
  )
}
