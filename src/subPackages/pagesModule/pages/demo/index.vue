<!-- Demo 页面 - 路由: subPackages/pagesModule/pages/demo/index -->
<template>
  <view class="demo-page">
 
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'

// 页面配置
defineOptions({
  name: 'Demo'
})

// 响应式数据
const loading = ref(false)

// 页面生命周期
onMounted(() => {
  console.log('Demo 页面已加载')
})

// 方法定义
const handleClick = () => {
  console.log('点击了Demo页面')
}
</script>

<style lang="scss">
.demo-page {

}
</style>
