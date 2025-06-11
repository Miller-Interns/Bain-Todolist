<template>
  <div class="todo-view">
    <h1>TODO Categories</h1>

    <!-- Add new category -->
    <div class="add-category">
      <input type="text" v-model="newCategory" placeholder="Add new category" />
      <button @click="addCategory">Add Category</button>
    </div>

    <!-- No categories yet -->
    <div v-if="todoStore.categories.length === 0" class="no-categories">
      <p>No Stuff to do yet. Don't be Lazy and come add some tasks.</p>
    </div>

    <!-- List of categories -->
    <ul>
      <li v-for="category in todoStore.categories" :key="category.id" class="category-item">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <strong>{{ category.name }}</strong>
          <button @click="todoStore.removeCategory(category.id)">Remove</button>
        </div>

        <!-- Todo list -->
        <ul class="todo-list">
          <li v-for="todo in category.todos" :key="todo.id" class="todo-item">
            <!-- Checkbox -->
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="todoStore.toggleTodoStatus(category.id, todo.id)"
            />

            <!-- EDIT-->
            <template
              v-if="editingTodo?.categoryId === category.id && editingTodo?.todoId === todo.id"
            >
              <input v-model="editInputs[todo.id]" />
              <button @click="saveEdit(category.id, todo.id)">Save</button>
              <button @click="cancelEdit">Cancel</button>
            </template>

            <!-- VIEW MODE -->
            <template v-else>
              <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
                {{ todo.text }}
              </span>
              <button @click="startEditing(category.id, todo.id, todo.text)">✏️ Edit</button>
            </template>

            <!-- Always show delete -->
            <button @click="todoStore.removeTodoFromCategory(category.id, todo.id)">🗑</button>
          </li>
        </ul>

        <!-- Add new todo -->
        <div class="add-category" style="margin-top: 10px">
          <input type="text" v-model="todoInputs[category.id]" placeholder="Add a todo" />
          <button @click="addTodo(category.id)">Add Todo</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTodoLogic } from '@/composables/useTodoLogic'
const {
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
} = useTodoLogic()
</script>

<style scoped>
.todo-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
}

.add-category {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type='text'] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  border: none;
  background-color: #409eff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2979ff;
}

ul {
  list-style: none;
  padding-left: 0;
}

.category-item {
  background-color: #f7f7f7;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
}

.todo-list {
  margin-top: 10px;
  margin-left: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 0;
}
.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.todo-item span,
.todo-item input[type='text'] {
  flex: 1;
}

.todo-item button {
  white-space: nowrap;
}
</style>
