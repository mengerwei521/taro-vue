<!--  - 路由-页面: subPackages/pagesModule/pages/meng/index -->
<template>
  <view class="meng-component">
    <text>{{ PascalName }}</text>
  </view>
</template>

<script setup>
defineOptions({
  name: "Meng",
});

const props = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped>
.meng-component {
  // 自定义样式
}
</style>
