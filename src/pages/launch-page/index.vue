<!-- LaunchPage 页面 - 路由: pages/launch-page/index -->
<template>
  <view class="launch-page-page function_flex">
    <PrivacyAgreement />
  </view>
</template>

<script setup>
import { definePlatformComponents } from "@/utils/platformComponents";
import privacyagreement from "@/subPackages/mainPackageModule/components/weapp/PrivacyAgreement.vue";
const PrivacyAgreement = definePlatformComponents({
  weapp: privacyagreement,
});
// 页面配置
defineOptions({
  name: "LaunchPage",
});

// 响应式数据
const loading = ref(false);

// 页面生命周期
onMounted(() => {
  console.log("LaunchPage 页面已加载");
});

// 方法定义
const handleClick = () => {
  console.log("点击了LaunchPage页面");
};
</script>

<style lang="scss">
.launch-page-page {
}
</style>
