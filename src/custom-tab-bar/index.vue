<!-- CustomTabBar 组件 - 路由: custom-tab-bar/index -->
<template>
  <cover-view class="custom-tab-bar">
    <cover-view class="custom-tab-bar-border"></cover-view>
    <cover-view class="custom-tab-bar-list">
      <cover-view
        v-for="(item, index) in list"
        :key="index"
        class="tab-bar-item"
        @tap="switchTab(index, item.pagePath)"
      >
        <cover-view
          class="tab-bar-item-text"
          :style="{ color: selected === index ? selectedColor : color }"
          >{{ item.text }}</cover-view
        >
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script setup>
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

<style lang="scss" scoped>
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);

  .custom-tab-bar-border {
    background-color: rgba(0, 0, 0, 0.33);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
  }
  .custom-tab-bar-list {
    .tab-bar-item {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .tab-bar-item-text {
        font-size: 20px;
      }
    }
  }
}
</style>
