import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/user/:id',
    name: 'user page',
    component: () => import('@/pages/UserInfo.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/Registration.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
