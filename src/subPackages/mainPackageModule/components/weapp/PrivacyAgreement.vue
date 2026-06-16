<template>
  <div class="privacy-agreement">
    1111111111
    <div class="popup" v-if="show">
      <div class="title">隐私政策提示</div>
      <div class="content">
        <span>请您在使用前点击</span>
        <span class="desc" @tap="openPrivacyContract">《隐私政策》</span>
        <span
          >并仔细阅读，如您同意全部内容，请点击同意开始使用我们的服务。</span
        >
      </div>
      <div class="footer">
        <button class="item-btn disagree-btn" @tap="onDisAgree">
          不同意并退出
        </button>
        <button
          class="item-btn agree-btn"
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

<style lang="scss" scoped>
.privacy-agreement {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;

  .popup {
    height: 550px;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 28px 28px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin-top: 80px;
      font-size: 32px;
      color: #161615;
      line-height: 60px;
    }

    .content {
      margin: 40px 30px 80px 30px;
      font-size: 28px;
      font-weight: normal;
      color: #6e6e6e;
      line-height: 50px;

      .desc {
        color: #328ef5;
      }
    }

    .footer {
      margin: 0 30px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item-btn {
        width: 328px;
        height: 88px;
        border-radius: 44px;
        font-weight: 500;
        box-sizing: border-box;
        line-height: 88px;
        text-align: center;
        padding: unset;
        font-size: 32px;
        box-sizing: border-box;
      }

      .disagree-btn {
        border: 1px solid #ff7c00;
        color: #fc8b2e;
        background-color: #fff;
      }

      .agree-btn {
        background: linear-gradient(-4deg, #fd9d2e, #fba92c);
        color: #ffffff;
        text-align: center;
        padding: unset;
      }
    }
  }
}
</style>
