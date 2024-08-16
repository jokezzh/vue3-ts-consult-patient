// 创建pinia实例
//创建插件
import { createPinia } from 'pinia'
import presist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(presist)

export default pinia

export * from './modules/user'
export * from './modules/consult'
