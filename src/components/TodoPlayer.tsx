import { ElementProps } from "kaioken"
import { PlayIcon } from "./icons/PlayIcon"
import { StopIcon } from "./icons/StopIcon"
import { useTodos } from "$/context/TodosContext"
import { TodoItem } from "$/types"

interface TodoPlayerProps extends ElementProps<"button"> {
  todo: TodoItem
}

export const TodoPlayer = ({ todo, ...props }: TodoPlayerProps) => {
  const { playingTodo, playTodo } = useTodos()
  return (
    <button onclick={() => playTodo(todo)} {...props}>
      {playingTodo?.id === todo.id ? (
        <StopIcon width="1.5rem" height="1.5rem" />
      ) : (
        <PlayIcon width="1.5rem" height="1.5rem" />
      )}
    </button>
  )
}
