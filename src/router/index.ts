import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  //默认参数'/' 基础路径
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    }
  ]
})

// 全局前置导航
router.beforeEach((to) => {
  //获取token
  const store = useUserStore()
  //白名单
  const wihteList = ['/login']
  // 如果没有token，且不在白名单跳转登录
  if (!store.user?.token && !wihteList.includes(to.path)) return '/login'
})

//后置导航
router.afterEach((to) => {
  document.title = `${to.meta.title || ''} - 优医问诊`
})

export default router
