<!--  - 路由-组件: {{routePath}} -->
<template>
  <view class="{{kebabName}}-component">
    <text>{{ PascalName }}</text>
  </view>
</template>

<script setup>
defineOptions({
  name: "{{PascalName}}",
});

const props = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped>
.{{kebabName}}-component {
  // 自定义样式
}
</style>
