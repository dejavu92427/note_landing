<template>
  <div>
    <div class="wrap" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/bg_pc.png')})` }">
      <div class="layout-center">
        <div class="layout-title">
          <div class="title-1 pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/title_01.png')})` }"></div>
          <div class="title-2 pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/title_02.png')})` }"></div>
        </div>
        <div class="layout-text">
          <div class="logo pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/logo_cover.png')})` }"></div>
          <div class="title pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/title_03.png')})` }"></div>

          <div class="enter-pc-wrap"><a id="visitPC" :href="pcUrl" target="_blank">进入PC网页版</a></div>
        </div>
        <div class="layout-mobile">
          <div class="phone-1 pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/phone_img01.png')})` }"></div>
          <div class="phone-2 pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/phone_img02.png')})` }">
            <qrcode-vue id="qrcode" :value="qrcodeOpt.value" :size="qrcodeOpt.size"></qrcode-vue>
          </div>
          <div class="shadow-1 pic-t" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/phone_shadow01.png')})` }"></div>
          <div class="shadow-2 pic-t" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/phone_shadow02.png')})` }"></div>
        </div>
      </div>
      <div class="layout-player">
        <div class="cover pic-t" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/player.png')})` }"></div>
      </div>
      <div class="and-help"><a href="#intro" ㄋ>Android幫助</a></div>
    </div>
    <div class="android-container" id="intro">
      <div class="header">
        <div class="logo">
          <i class="fa fa-android" style="font-size: 48px"></i>
          <!-- <img
            :src="`${cdnPath}${require('@/assets/img/porn1/android-brands.svg')}`"
            :style="{ width: '48px', height: '48px', 'background-color': '#fff', filter: 'brightness(300%);' }"
            alt=""
          /> -->
          android问题排除
        </div>
        <div class="desc">
          <span
            :class="{ active: tab1Active }"
            @click="
              tab1Active = true;
              tab2Active = false;
            "
          >
            安装威胁
          </span>
          <span
            :class="{ active: tab2Active }"
            @click="
              tab2Active = true;
              tab1Active = false;
            "
          >
            支付软体报毒
          </span>
        </div>
      </div>
      <div class="content">
        <img v-if="tab1Active == true" :src="`${cdnPath}${require('@/assets/img/porn1/an_install_tab1.png')}`" alt="" />
        <img v-else :src="`${cdnPath}${require('@/assets/img/porn1/an_install_tab2.png')}`" alt="" />
        <div v-if="tab2Active == true" class="button-wrap">
          <button
            :class="{ 'oppo-active': oppo }"
            @click="
              oppo = true;
              vivo = false;
              huawei = false;
            "
          >
            OPPO
          </button>
          <button
            :class="{ 'vivo-active': vivo }"
            @click="
              oppo = false;
              vivo = true;
              huawei = false;
            "
          >
            VIVO
          </button>
          <button
            :class="{ 'huawei-active': huawei }"
            @click="
              oppo = false;
              vivo = false;
              huawei = true;
            "
          >
            Huawei
          </button>
        </div>
        <div v-if="tab2Active == true" class="answer-wrap">
          <img v-if="oppo" :src="`${cdnPath}${require('@/assets/img/porn1/pc-answer-1.png')}`" alt="" />
          <img v-if="vivo" :src="`${cdnPath}${require('@/assets/img/porn1/pc-answer-2.png')}`" alt="" />
          <img v-if="huawei" :src="`${cdnPath}${require('@/assets/img/porn1/pc-answer-3.png')}`" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Action, Getter } from 'vuex-class';
import { isMobile } from '../../../lib/isMobile';
import qrcodeVue from 'qrcode.vue';
import { initRouterReferralCode } from '../../../lib/referralCode';

@Options({
  components: {
    qrcodeVue,
  },
})
export default class PcPorn1 extends Vue {
  @Action('getHostnames') getHostnames!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;

  @Getter('getCDN') cdnPath!: string;
  @Getter('getHostnames') hostnames!: string;

  qrcodeOpt = {
    value: '',
    size: 170,
  };

  pcUrl = '/';

  data() {
    return {
      tab1Active: true,
      tab2Active: false,
      oppo: true,
      vivo: false,
      huawei: false,
    };
  }
  created() {
    if (isMobile()) {
      this.$router.push({
        name: 'download',
        query: { ...this.$route.query },
      });
      return;
    }

    if (this.$route.query) {
      initRouterReferralCode(this.$route.query);
    }

    this.qrcodeOpt.value = `${localStorage.getItem('referral-link')}`;
    this.getHostnames({ clientType: 13 }).then(() => {
      this.actionLinkTo('visitPC').then((result) => {
        this.pcUrl = result;
      });
    });
  }
}
</script>
<style lang="scss">
body {
  max-width: unset;
  min-width: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  border: none;
  margin: 0 auto !important;
}

.wrap {
  position: relative;
  height: 1080px;
  width: 1920px;
  background-repeat: no-repeat;
}

.pic {
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.layout-center {
  position: relative;
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
}

.layout-title {
  position: absolute;
  top: 188px;
  left: 11px;
  z-index: 10;
  display: block;

  .title-1 {
    position: absolute;
    top: 0;
    left: 128px;
    width: 537px;
    height: 104px;
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
  }

  .title-2 {
    position: absolute;
    top: 92px;
    left: 0;
    width: 378px;
    height: 89px;
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
  }
}

.layout-mobile {
  position: absolute;
  top: 215px;
  left: 34.3%;
  z-index: 1;
  display: block;
  width: 503px;
  height: 708px;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;

  > div {
    position: absolute;
    display: block;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-duration: 7.5s;
    animation-duration: 7.5s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  .phone-1 {
    top: 58px;
    left: 40px;
    width: 192px;
    height: 506px;
    -webkit-animation-name: phoneMove1;
    animation-name: phoneMove1;
  }

  .phone-2 {
    right: 0;
    width: 349px;
    height: 624px;
    -webkit-animation-name: phoneMove2;
    animation-name: phoneMove2;
  }
}

.layout-text {
  position: absolute;
  top: 274px;
  right: 0;
  z-index: 10;
  display: block;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;

  .logo {
    width: 245px;
    height: 108px;
    margin: 0 auto 30px;
  }

  .title {
    width: 442px;
    height: 360px;
  }
}

.layout-player {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: block;
  width: 100%;
  height: 820px;
  overflow: hidden;

  .cover {
    content: '';
    position: absolute;
    top: 0;
    left: calc(50% - 960px);
    display: block;
    width: 1920px;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 0% 50%;
    -webkit-animation-name: slideLeft;
    animation-name: slideLeft;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
  }
}

#qrcode {
  content: '';
  position: absolute;
  top: 215px;
  left: 96px;
  z-index: 2;
  display: block;
  font-size: 0;
}

.and-help {
  width: 150px;
  height: 40px;
  margin-left: auto;
  a {
    text-decoration: none;
    background: #000;
    color: #fff;
    padding: 5px;
  }
}

.android-container {
  width: 100vw;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
    color: #fff;
    padding: 20px;
    margin-top: 20px;

    .logo {
      font-size: 36px;
    }
    .desc {
      span {
        margin: 0 10px;
        padding: 27px 0;
        font-size: 18px;
        cursor: pointer;
        &.active {
          color: #32de84;
          border-bottom: 5px solid #32de84;
        }
      }
    }
  }
}

.button-wrap {
  position: absolute;
  top: 1315px;
  right: 373px;

  button {
    width: 140px;
    height: 46px;
    border: none;
    margin: 2px;
    border-radius: 3px;
    cursor: pointer;
    &.oppo-active {
      background-color: #0d6a30;
      color: #fff;
    }
    &.vivo-active {
      background-color: #425eff;
      color: #fff;
    }
    &.huawei-active {
      background-color: #d41c26;
      color: #fff;
    }
  }
}

.answer-wrap {
  position: absolute;
  z-index: 10;
  top: 1365px;
  right: 400px;
  img {
    width: 800px;
    height: auto;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes phoneMove1 {
  0% {
    -webkit-transform: translateY(-2%);
    transform: translateY(-2%);
  }
  50% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
  100% {
    -webkit-transform: translateY(-2%);
    transform: translateY(-2%);
  }
}
@keyframes phoneMove1 {
  0% {
    -webkit-transform: translateY(-2%);
    transform: translateY(-2%);
  }
  50% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
  100% {
    -webkit-transform: translateY(-2%);
    transform: translateY(-2%);
  }
}
@-webkit-keyframes phoneMove2 {
  0% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
  50% {
    -webkit-transform: translateY(-2%);
    transform: translateY(-2%);
  }
  100% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
}
@keyframes phoneMove2 {
  0% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
  50% {
    -webkit-transform: translateY(-2%);
    transform: translateY(-2%);
  }
  100% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
}
@-webkit-keyframes shadow2 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes shadow2 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.enter-pc-wrap {
  height: 58px;
  text-align: center;
  width: 100%;

  > a#visitPC {
    font-size: 24px;
    height: 100%;
    width: 195px;
    margin: 0 auto;
    line-height: 55px;
    background: #fff;
    border-radius: 12px;
    border: #000 3px solid;
    display: block;
    color: #0026b2;
    text-decoration: none;
  }
}

// a#visitPC:visited,
// a#visitPC:link,
a#visitPC:hover {
  text-decoration: none;
  border: #39c9ff 3px solid;
}

a#visitPC:active,
a#visitPC:checked {
  border: #000 3px solid;
}
</style>
