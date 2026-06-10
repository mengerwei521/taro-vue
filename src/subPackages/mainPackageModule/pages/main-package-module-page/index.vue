<!-- MainPackageModulePage 页面 - 路由: subPackages/mainPackageModule/pages/main-package-module-page/index -->
<template>
  <view class="main-package-module-page-page">
 
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'

// 页面配置
defineOptions({
  name: 'MainPackageModulePage'
})

// 响应式数据
const loading = ref(false)

// 页面生命周期
onMounted(() => {
  console.log('MainPackageModulePage 页面已加载')
})

// 方法定义
const handleClick = () => {
  console.log('点击了MainPackageModulePage页面')
}
</script>

<style lang="scss">
.main-package-module-page-page {

}
</style>
