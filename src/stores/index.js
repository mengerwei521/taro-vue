import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 创建 pinia 实例
const pinia = createPinia()
// 只在 H5 环境下挂载持久化插件
if (process.env.TARO_ENV === 'h5') {
  pinia.use(piniaPluginPersistedstate)
}
// 默认导出，给 main.js 使用
export default pinia;
