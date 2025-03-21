import { useState, useSignal } from "kaioken"
import { newTodoSymbol, TodosContext } from "$/context/TodosContext"
import { useVoices } from "$/context/VoicesContext"
import { storage } from "$/storage"
import { TodoItem, TodoItemDTO } from "$/types"

const todosFromStorage = storage.get("todos")
const initialTodos = todosFromStorage ? JSON.parse(todosFromStorage) : []

export function TodosProvider({ children }: { children: JSX.Children }) {
  const { createUtterance, setUtterance } = useVoices()
  const todos = useSignal<TodoItem[]>(initialTodos)
  const [playingTodo, setPlayingTodo] = useState<TodoItem | null>(null)
  const setTodosLocal = (setter: (prev: TodoItem[]) => TodoItem[]) => {
    const newTodos = (todos.value = setter(todos.value))
    storage.set("todos", JSON.stringify(newTodos))
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
    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, deleting: true } : todo
    )
  }

  const playTodo = (todo: TodoItem) => {
    if (playingTodo?.id === todo.id) {
      window.speechSynthesis.cancel()
      setUtterance(null)
      setPlayingTodo(null)
      return
    }
    setPlayingTodo(todo)
    createUtterance(todo.text, () => setPlayingTodo(null))
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos: setTodosLocal,
        addTodo,
        deleteTodo,
        playingTodo,
        playTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}
