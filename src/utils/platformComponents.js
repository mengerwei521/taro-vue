// 自动识别当前平台 H5、小程序等多个平台
import {
  defineAsyncComponent, h
} from 'vue'

const EmptyComponent = {
  render: () => h(null)
}
const WeappEmptyComponent = {
  template: '<view />'
}

export function definePlatformComponents(componentMap) {
  const env = process.env.TARO_ENV
  if (env === 'h5') {
    const importer = componentMap.h5
    return importer ? defineAsyncComponent(importer) : null
  } else if (env === 'weapp') {
    // 小程序端直接返回静态组件对象（必须已经导入）
    return componentMap.weapp || null
  }
}
// 示例：定义一个平台组件，自动根据平台加载对应的组件
//import privacyagreement from "@/subPackages/mainPackageModule/components/weapp/PrivacyAgreement.vue";-小程序必须这样写，没有下载支持import()的插件【小程序】
//import customTabBar from "@/custom-tab-bar/index.vue";-h5这样写是为了解决在npm run dev:weapp 小程序打包下的报错；
// const TabBar = definePlatformComponents({
//   h5:customTabBar,
//   weapp:privacyagreement,   // 小程序端专用组件
//   // 未定义的平台（如 swan、alipay）会自动使用空组件
// })
