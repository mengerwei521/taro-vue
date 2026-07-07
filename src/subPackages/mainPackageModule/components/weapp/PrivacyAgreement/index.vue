<template>
  <div :class="styles['privacy-agreement']">
    1111111111
    <div :class="styles['popup']" v-if="show">
      <div :class="styles['title']">隐私政策提示</div>
      <div :class="styles['content']">
        <span>请您在使用前点击</span>
        <span :class="styles['desc']" @tap="openPrivacyContract"
          >《隐私政策》</span
        >
        <span
          >并仔细阅读，如您同意全部内容，请点击同意开始使用我们的服务。</span
        >
      </div>
      <div :class="styles['footer']">
        <button
          :class="styles['item-btn'] + ' ' + styles['disagree-btn']"
          @tap="onDisAgree"
        >
          不同意并退出
        </button>
        <button
          :class="styles['item-btn'] + ' ' + styles['agree-btn']"
          open-type="agreePrivacyAuthorization"
          @agreeprivacyauthorization="onAgree"
        >
          同意并继续
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import styles from "./index.module.scss";
defineOptions({ name: "PrivacyAgreement" });
// 声明可触发的事件
const emit = defineEmits(["disagree", "agree"]);
let timer = null;
let show = ref(false);
let tranShow = ref(false);
onMounted(() => {
  console.log(Taro.canIUse("getPrivacySetting"), onAgree, "111111");
  //查询隐私授权情况。
  if (Taro.canIUse("getPrivacySetting")) {
    Taro.getPrivacySetting({
      success: (res) => {
        console.log(
          "是否需要授权：",
          res.needAuthorization,
          "隐私协议的名称为：",
          res.privacyContractName,
        );
        if (res.needAuthorization) {
          openPopUp();
        } else {
          onAgree("agree");
        }
      },
      fail: () => {},
      complete: () => {},
    });
  } else {
    // 低版本基础库不支持 wx.getPrivacySetting 接口，隐私接口可以直接调用
    onAgree("agree");
  }
});
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
// 跳转至隐私协议页面
function openPrivacyContract() {
  wx.openPrivacyContract({
    success: (res) => {
      console.log("openPrivacyContract success");
    },
    fail: (res) => {
      console.error("openPrivacyContract fail", res);
    },
  });
}
//打开弹框
function openPopUp() {
  show.value = true;
  setTimeout(() => {
    tranShow.value = true;
  }, 300);
}
//关闭弹框
function closePopUp() {
  show.value = false;
  setTimeout(() => {
    tranShow.value = false;
  }, 300);
}
//不同意
function onDisAgree() {
  emit("disagree");
  closePopUp();
}
//同意
function onAgree() {
  emit("agree");
  closePopUp();
}
</script>
