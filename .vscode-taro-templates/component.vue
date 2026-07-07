<!--  - 路由-组件: {{routePath}} -->
<template>
  <view :class="styles['{{kebabName}}-component']"> </view>
</template>

<script setup>
import styles from "./index.module.{{styleExt}}";

defineOptions({
  name: "{{PascalName}}",
});

const props = defineProps({
  title: String,
});
</script>
