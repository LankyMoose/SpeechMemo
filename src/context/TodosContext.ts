import { TodoItem, TodoItemDTO } from "$/types"
import { createContext, useContext } from "kaioken"

interface TodosCtx {
  todos: TodoItem[]
  setTodos: (setter: (prev: TodoItem[]) => TodoItem[]) => void
  playTodo: (todo: TodoItem) => void
  playingTodo: TodoItem | null
  addTodo: (todo: TodoItemDTO) => void
  deleteTodo: (id: string, hardDelete: boolean) => void
}

export const TodosContext = createContext<TodosCtx>(null as any)

export const newTodoSymbol = Symbol.for("newTodo")
export const isNewTodo = (val: TodoItem) => newTodoSymbol in val
export const useTodos = () => useContext(TodosContext)
