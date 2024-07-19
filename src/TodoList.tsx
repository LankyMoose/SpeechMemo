import { Transition, TransitionState } from "kaioken"
import { useTodos, TodoItem as Todo } from "./TodosProvider"

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
  const toggleTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }
  const opacity = transitionState === "entered" ? "1" : "0"
  const translateY = transitionState === "entered" ? "0" : "-100%"
  return (
    <li
      style={{ opacity, transform: `translateY(${translateY})` }}
      className="transition-all flex items-center gap-4 p-4 rounded-lg bg-[#333] shadow-md shadow-[#0003]"
    >
      <span className="flex-grow select-none">{todo.text}</span>
      <div className="flex items-center">
        <input
          className="w-8 h-8"
          type="checkbox"
          checked={todo.done}
          onchange={() => toggleTodo(todo.id)}
        />
      </div>
    </li>
  )
}
