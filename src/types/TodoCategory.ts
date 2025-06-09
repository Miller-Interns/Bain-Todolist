import type { TodoItem } from './TodoItem'

export interface TodoCategory {
  id: string
  name: string
  todos: TodoItem[]
}
