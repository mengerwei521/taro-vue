// 自动识别当前平台 H5、小程序等多个平台
import { defineAsyncComponent, h } from 'vue'

const EmptyComponent = { render: () => null }

export function definePlatformComponents(componentMap) {
  const current = process.env.TARO_ENV
  const importer = componentMap[current]
  return importer ? defineAsyncComponent(importer) : EmptyComponent
}
// 示例：定义一个平台组件，自动根据平台加载对应的组件
// const TabBar = definePlatformComponents({
//   h5: () => import('./H5TabBar.vue'),
//   weapp: () => import('./WeappTabBar.vue'),   // 小程序端专用组件
//   // 未定义的平台（如 swan、alipay）会自动使用空组件
// })
