import { TodoItem, TodoItemDTO } from "$/types"
import { createContext, useContext } from "kaioken"

interface TodosCtx {
  todos: TodoItem[]
  setTodos: (setter: (prev: TodoItem[]) => TodoItem[]) => void
  addTodo: (todo: TodoItemDTO) => void
  deleteTodo: (id: string, hardDelete: boolean) => void
}

export const TodosContext = createContext<TodosCtx>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
})

export const newTodoSymbol = Symbol.for("newTodo")
export const isNewTodo = (val: TodoItem) => newTodoSymbol in val
export const useTodos = () => useContext(TodosContext)
