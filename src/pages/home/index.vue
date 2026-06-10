<!-- Home 页面 - 路由: pages/home/index -->
<template>
  <view class="home-page">
    home
    <!-- 仅 H5 需要手动渲染 TabBar，小程序由框架自动处理 custom-tab-bar/index -->
    <tab-bar v-if="isH5" />
  </view>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { GetConfigInfor } from "@/api/public.js";

const isH5 = process.env.TARO_ENV === 'h5'
const TabBar = isH5 ? defineAsyncComponent(() => import('@/custom-tab-bar/index.vue')) : null
// 页面配置
defineOptions({
  name: "Home",
});

// 响应式数据
const loading = ref(false);

// 页面生命周期
onMounted(async () => {
  console.log("Home 页面已加载");
  const result = await GetConfigInfor();
  console.log(result, Taro.loadSubPackage, "result");
});

// 方法定义
const handleClick = () => {
  console.log("点击了Home页面");
};
</script>

<style lang="scss">
.home-page {
}
</style>
