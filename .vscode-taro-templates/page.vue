<!--  - 路由-页面: {{routePath}} -->
<template>
  <view :class="styles['{{kebabName}}-page']"> </view>
</template>

<script setup>
import { ref } from "vue";
import styles from "./index.module.{{styleExt}}";

defineOptions({
  name: "{{PascalName}}",
});

// 自定义逻辑
</script>
