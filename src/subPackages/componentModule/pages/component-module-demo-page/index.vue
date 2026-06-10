<!-- ComponentModuleDemoPage 页面 - 路由: subPackages/componentModule/pages/component-module-demo-page/index -->
<template>
  <view class="component-module-demo-page-page">
 
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'

// 页面配置
defineOptions({
  name: 'ComponentModuleDemoPage'
})

// 响应式数据
const loading = ref(false)

// 页面生命周期
onMounted(() => {
  console.log('ComponentModuleDemoPage 页面已加载')
})

// 方法定义
const handleClick = () => {
  console.log('点击了ComponentModuleDemoPage页面')
}
</script>

<style lang="scss">
.component-module-demo-page-page {

}
</style>
