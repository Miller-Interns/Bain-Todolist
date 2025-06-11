import { ref, reactive } from 'vue'
import { useTodoStore } from '@/stores/todo' // Adjust path as needed

export function useTodoLogic() {
  const todoStore = useTodoStore()

  const newCategory = ref('')
  const todoInputs = reactive<Record<string, string>>({})
  const editingTodo = ref<{ categoryId: string; todoId: string } | null>(null)
  const editInputs = reactive<Record<string, string>>({})

  const addCategory = () => {
    if (newCategory.value.trim()) {
      todoStore.addCategory(newCategory.value)
      newCategory.value = ''
    }
  }

  function addTodo(categoryId: string) {
    const text = todoInputs[categoryId]?.trim()
    if (text) {
      todoStore.addTodoToCategory(categoryId, {
        id: crypto.randomUUID(),
        text,
      })
      todoInputs[categoryId] = ''
    }
  }

  function startEditing(categoryId: string, todoId: string, currentText: string) {
    editingTodo.value = { categoryId, todoId }
    editInputs[todoId] = currentText
  }

  function cancelEdit() {
    editingTodo.value = null
  }

  function saveEdit(categoryId: string, todoId: string) {
    const category = todoStore.categories.find((c) => c.id === categoryId)
    if (!category) return
    const todo = category.todos.find((t) => t.id === todoId)
    if (!todo) return
    const newText = editInputs[todoId]?.trim()
    if (newText && newText !== todo.text) {
      todo.text = newText
    }
    editingTodo.value = null
  }

  return {
    newCategory,
    todoInputs,
    editInputs,
    editingTodo,
    addCategory,
    addTodo,
    startEditing,
    cancelEdit,
    saveEdit,
    todoStore,
  }
}
