export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
  dueDate: Date | null
}

export type TodoFilter = "all" | "completed" | "pending"
