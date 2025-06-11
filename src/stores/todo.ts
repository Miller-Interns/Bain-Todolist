import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TodoCategory } from '@/types/TodoCategory'
import { onMounted, watch } from 'vue'

// We create and export a store called 'todo'
export const useTodoStore = defineStore('todo', () => {
  // 🔹 Reactive list of categories
  const categories = ref<TodoCategory[]>([])
  onMounted(() => {
    const saved = localStorage.getItem('todo-categories')
    if (saved) {
      categories.value = JSON.parse(saved)
    }
  })
  watch(
    categories,
    (newValue) => {
      localStorage.setItem('todo-categories', JSON.stringify(newValue))
    },
    { deep: true },
  )
  // ✅ Add a new category with a unique ID
  function addCategory(name: string) {
    const newCategory: TodoCategory = {
      id: crypto.randomUUID(), // generates a unique ID
      name,
      todos: [], // starts empty
    }
    categories.value.push(newCategory)
  }

  // ✅ Remove a category by ID
  function removeCategory(categoryId: string) {
    categories.value = categories.value.filter((category) => category.id !== categoryId)
  }

  // ✅ Add a todo item to a category (adds 'completed: false' automatically)
  function addTodoToCategory(categoryId: string, todo: { id: string; text: string }) {
    const category = categories.value.find((cat) => cat.id === categoryId)
    if (category) {
      category.todos.push({
        ...todo,
        completed: false, // new todos start as not completed
      })
    }
  }

  // ✅ Mark a todo as completed or uncompleted
  function toggleTodoStatus(categoryId: string, todoId: string) {
    const category = categories.value.find((cat) => cat.id === categoryId)
    if (category) {
      const todo = category.todos.find((t) => t.id === todoId)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }

  // ✅ Remove a todo from a category
  function removeTodoFromCategory(categoryId: string, todoId: string) {
    const category = categories.value.find((cat) => cat.id === categoryId)
    if (category) {
      category.todos = category.todos.filter((t) => t.id !== todoId)
    }
  }

  // 📤 Return all state and actions so components can use them
  return {
    categories,
    addCategory,
    removeCategory,
    addTodoToCategory,
    toggleTodoStatus,
    removeTodoFromCategory,
  }
})
