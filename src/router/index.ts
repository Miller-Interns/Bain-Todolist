import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/IntroView.vue'
import TodoView from '../views/TodoView.vue'
import { RouteNames } from './route-names'
const routes = [
  { path: '/', name: RouteNames.Intro, component: IntroView },
  { path: '/todo', name: RouteNames.Todo, component: TodoView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
