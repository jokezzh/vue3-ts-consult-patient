import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  //默认参数'/' 基础路径
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/index.vue') }
  ]
})

export default router
