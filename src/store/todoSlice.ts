import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Todo {
  id: string
  text: string
  completed: boolean
  dueDate: Date | null
  createdAt: number
}

interface TodoState {
  items: Todo[]
}

const initialState: TodoState = {
  items: [],
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ text: string; dueDate: Date | null }>
    ) => {
      state.items.push({
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        dueDate: action.payload.dueDate ? action.payload.dueDate : null,
        createdAt: Date.now(),
      })
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(t => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.items.find(t => t.id === action.payload.id)
      if (todo) todo.text = action.payload.text
    },
  },
})

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions
export default todoSlice.reducer
