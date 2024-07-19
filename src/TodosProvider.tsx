import { createContext, useContext, useState } from "kaioken"

export interface TodoItem {
  id: string
  text: string
}

interface TodosCtx {
  todos: TodoItem[]
  setTodos: (setter: (prev: TodoItem[]) => TodoItem[]) => void
}

const TodosContext = createContext<TodosCtx>({
  todos: [],
  setTodos: () => {},
})

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

  return (
    <TodosContext.Provider value={{ todos, setTodos: setTodosLocal }}>
      {children}
    </TodosContext.Provider>
  )
}
