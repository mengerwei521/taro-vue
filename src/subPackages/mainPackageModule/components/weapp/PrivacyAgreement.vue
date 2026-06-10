<template>
  <div class="privacy-agreement">
    <div class="popup" v-if="show">
      <div class="title">隐私政策提示</div>
      <div class="content">
        <span>请您在使用前点击</span>
        <span class="desc" @tap="openPrivacyContract">《隐私政策》</span>
        <span>并仔细阅读，如您同意全部内容，请点击同意开始使用我们的服务。</span>
      </div>
      <div class="footer">
        <button class="item-btn disagree-btn" @tap="onDisAgree">不同意并退出</button>
        <button class="item-btn agree-btn" open-type="agreePrivacyAuthorization"
          @agreeprivacyauthorization="onAgree">同意并继续</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'PrivacyAgreement' });
let timer = null;
let show = ref(false);
let tranShow = ref(false);
onMounted(() => {

})
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
// 跳转至隐私协议页面
function openPrivacyContract() {
  wx.openPrivacyContract({
    success: res => {
      console.log('openPrivacyContract success')
    },
    fail: res => {
      console.error('openPrivacyContract fail', res)
    }
  })
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
  this.$emit('disagree')
  closePopup()
}
//同意
function onAgree() {
  this.$emit('agree')
  closePopup()
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
      color: #6E6E6E;
      line-height: 50px;

      .desc {
        color: #328EF5;
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
        border: 1px solid #FF7C00;
        color: #FC8B2E;
        background-color: #fff;
      }

      .agree-btn {
        background: linear-gradient(-4deg, #FD9D2E, #FBA92C);
        color: #FFFFFF;
        text-align: center;
        padding: unset;
      }
    }
  }
}
</style>
