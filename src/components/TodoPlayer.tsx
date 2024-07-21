import { ElementProps } from "kaioken"
import { PlayIcon } from "./icons/PlayIcon"
import { StopIcon } from "./icons/StopIcon"
import { useTodos } from "$/context/TodosContext"
import { TodoItem } from "$/types"
import { useVoices } from "$/context/VoicesContext"

interface TodoPlayerProps extends ElementProps<"button"> {
  todo: TodoItem
}

export const TodoPlayer = ({ todo, ...props }: TodoPlayerProps) => {
  const { selectedVoice } = useVoices()
  const { playingTodo, playTodo } = useTodos()
  if (!selectedVoice) return null
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
