import { createContext, useContext, useState } from "kaioken"

export type TodoItem = {
  id: string
  text: string
  createdAt: number
  deleted?: boolean
}

export type TodoItemDTO = Omit<TodoItem, "deleted" | "createdAt" | "id">

interface TodosCtx {
  todos: TodoItem[]
  setTodos: (setter: (prev: TodoItem[]) => TodoItem[]) => void
  addTodo: (todo: TodoItemDTO) => void
  deleteTodo: (id: string, hardDelete: boolean) => void
}

const TodosContext = createContext<TodosCtx>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
})

const newTodoSymbol = Symbol.for("newTodo")
export const isNewTodo = (val: TodoItem) => newTodoSymbol in val
export const useTodos = () => useContext(TodosContext)

export function TodosProvider({ children }: { children: JSX.Children }) {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const todos = localStorage.getItem("s2todos")
    return todos ? JSON.parse(todos) : []
  })

  const setTodosLocal = (setter: (prev: TodoItem[]) => TodoItem[]) => {
    const newTodos = setter(todos)
    setTodos(newTodos)
    localStorage.setItem("s2todos", JSON.stringify(newTodos))
  }

  const addTodo = (todo: TodoItemDTO) => {
    setTodosLocal((todos) => [
      Object.assign(todo, {
        id: Math.random().toString(36).slice(2),
        createdAt: Date.now(),
        [newTodoSymbol]: true,
      }),
      ...todos,
    ])
  }
  const deleteTodo = (id: string, hardDelete: boolean) => {
    if (hardDelete) {
      return setTodosLocal((todos) => todos.filter((todo) => todo.id !== id))
    }
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, deleted: true } : todo))
    )
  }

  return (
    <TodosContext.Provider
      value={{ todos, setTodos: setTodosLocal, addTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  )
}
