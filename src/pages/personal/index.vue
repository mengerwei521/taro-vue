<!-- Personal 页面 - 路由: pages/personal/index -->
<template>
  <view class="personal-page">
    personal333
    <CustomTabBar />
  </view>
</template>

<script setup>
import customTabBar from "@/custom-tab-bar/index.vue";
import { definePlatformComponents } from "@/utils/platformComponents";
const CustomTabBar = definePlatformComponents({
  h5: () => customTabBar,
});
// 页面配置
defineOptions({
  name: "Personal",
});

// 响应式数据
const loading = ref(false);

// 页面生命周期
onMounted(() => {
  console.log("Personal 页面已加载");
});

// 方法定义
const handleClick = () => {
  console.log("点击了Personal页面");
};
</script>

<style lang="scss">
.personal-page {
}
</style>
