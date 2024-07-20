export type TodoItem = {
  id: string
  text: string
  createdAt: number
  deleting?: boolean
}

export type TodoItemDTO = Omit<TodoItem, "deleted" | "createdAt" | "id">
