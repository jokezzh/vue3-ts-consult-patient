import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

//导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//关闭环形进度条图标
NProgress.configure({
  showSpinner: false
})

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
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/Consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/Consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
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
  //开启进度条
  NProgress.start()
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
  //关闭进度条
  NProgress.done()
})

export default router
