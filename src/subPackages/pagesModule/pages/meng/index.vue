<!--  - 路由-页面: subPackages/pagesModule/pages/meng/index -->
<template>
  <view :class="styles['meng-component']"></view>
</template>

<script setup>
import styles from "./index.module.scss";
defineOptions({
  name: "Meng",
});

const props = defineProps({
  title: String,
});
</script>
