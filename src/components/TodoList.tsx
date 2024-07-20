import { Transition, TransitionState } from "kaioken"
import type { TodoItem as Todo } from "$/types"
import { DeleteIcon } from "$/components/icons/DeleteIcon"
import { isNewTodo, useTodos } from "$/context/TodosContext"
import { TextToSpeech } from "./TextToSpeach"

export function TodoList() {
  const { todos, deleteTodo } = useTodos()

  return (
    <ul className="p-4 flex flex-col gap-4 overflow-hidden max-w-screen-md mx-auto">
      {todos.map((todo, idx) => (
        <Transition
          key={todo.id}
          in={!todo.deleted}
          onTransitionEnd={(state) => {
            if (state === "exited") {
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

interface TodoItemProps {
  todo: Todo
  transitionState: TransitionState
  zIndex: number
}

function TodoItem({ todo, transitionState, zIndex }: TodoItemProps) {
  const { deleteTodo } = useTodos()

  const opacity = transitionState === "entered" ? "1" : "0"
  const translateY = transitionState === "entered" ? "0" : "-100%"
  return (
    <li
      style={{
        opacity,
        transform: `translateY(${translateY})`,
        zIndex: zIndex.toString(),
      }}
      className={`todo-item transition-all items-start flex gap-4 p-4 bg-[#fff1] shadow-md shadow-[#0003] ${
        isNewTodo(todo) ? "highlight" : ""
      }`}
    >
      <div className="flex-grow flex flex-col gap-2 select-none">
        <span>{todo.text}</span>
        <small className="text-neutral-400">{numToDate(todo.createdAt)}</small>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <button
          className="text-neutral-400 hover:text-neutral-200"
          onclick={() => deleteTodo(todo.id, false)}
        >
          <DeleteIcon width="2rem" height="2rem" />
        </button>
        <button className="text-neutral-400 hover:text-neutral-200">
          <TextToSpeech inputText={todo.text} />
        </button>
      </div>
    </li>
  )
}

function numToDate(num: number) {
  return new Date(num).toLocaleString()
}