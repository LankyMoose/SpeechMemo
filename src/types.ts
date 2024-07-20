export type TodoItem = {
  id: string
  text: string
  createdAt: number
  deleted?: boolean
}

export type TodoItemDTO = Omit<TodoItem, "deleted" | "createdAt" | "id">
