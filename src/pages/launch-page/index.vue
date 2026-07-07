<!-- LaunchPage 页面 - 路由: pages/launch-page/index -->
<template>
  <view :class="[styles['launch-page'], 'function_flex']">
    <PrivacyAgreement @disagree="onDisagree" @agree="onAgree" />
  </view>
</template>

<script setup>
import styles from "./index.module.scss";
import { definePlatformComponents } from "@/utils/platformComponents";
import privacyagreement from "@/subPackages/mainPackageModule/components/weapp/PrivacyAgreement/index.vue";
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
  if (process.env.TARO_ENV == "h5") {
    onAgree();
  }
});

// 方法定义
const handleClick = () => {
  console.log("点击了LaunchPage页面");
};
//不同意
const onDisagree = () => {
  console.log("onDisagree");
};
//同意
const onAgree = () => {
  console.log("onAgree");
  Taro.reLaunch({
    url: "/pages/home/index",
  });
};
</script>
