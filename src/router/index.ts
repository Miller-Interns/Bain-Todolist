import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/IntroView.vue'
import TodoView from '../views/TodoView.vue'

const routes = [
  { path: '/', name: 'Intro', component: IntroView },
  { path: '/todo', name: 'Todo', component: TodoView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
