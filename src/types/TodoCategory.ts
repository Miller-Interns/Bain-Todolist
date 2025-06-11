import type { TodoItem } from './TodoItem'

export type TodoCategory = {
  id: string
  name: string
  todos: TodoItem[]
}
