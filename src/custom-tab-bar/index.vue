<!-- CustomTabBar 组件 - 路由: custom-tab-bar/index -->
<template>
  <cover-view :class="styles['custom-tab-bar']">
    <cover-view :class="styles['custom-tab-bar-border']"></cover-view>
    <cover-view :class="styles['custom-tab-bar-list']">
      <cover-view
        v-for="(item, index) in list"
        :key="index"
        :class="styles['tab-bar-item']"
        @tap="switchTab(index, item.pagePath)"
      >
        <cover-view
          :class="styles['tab-bar-item-text']"
          :style="{ color: selected === index ? selectedColor : color }"
          >{{ item.text }}</cover-view
        >
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script setup>
import styles from "./index.module.scss";
import { usePublicStore } from "@/stores/modules/public";
const color = "#000000";
const selectedColor = "#DC143C";
const publicStore = usePublicStore();
let selected = publicStore.customTabSelected;
watch(
  () => publicStore.customTabSelected,
  (newVal) => {
    selected = newVal;
    console.log("customTabSelected更新为:", newVal);
  },
);
// 组件配置
defineOptions({
  name: "CustomTabBar",
});
const list = [
  {
    pagePath: "pages/home/index",
    text: "首页",
  },
  {
    pagePath: "pages/personal/index",
    text: "个人中心",
  },
];
// 方法定义
function switchTab(index, url) {
  publicStore.setCustomTabSelected(index);
  Taro.switchTab({ url });
}
</script>
