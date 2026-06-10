<template>
  <H5TabBar />
</template>

<script setup>
defineOptions({ name: 'H5TabBar' });
const isH5 = process.env.TARO_ENV === 'h5';
// Vue 3 的异步组件，确保 H5 代码只在 H5 下被打包
const H5TabBar = isH5
  ? defineAsyncComponent(() => import('./index.vue'))
  : null;
</script>

<style lang="less" scoped></style>
