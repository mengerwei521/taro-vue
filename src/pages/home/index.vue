<!-- Home 页面 - 路由: pages/home/index -->
<template>
  <view class="home-page">
    home22
    <CustomTabBar />
  </view>
</template>

<script setup>
import { GetConfigInfor } from "@/api/public.js";
import customTabBar from "@/custom-tab-bar/index.vue";
import { definePlatformComponents } from "@/utils/platformComponents";
const CustomTabBar = definePlatformComponents({
  h5: customTabBar,
});
console.log(CustomTabBar, customTabBar, "CustomTabBar");
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
