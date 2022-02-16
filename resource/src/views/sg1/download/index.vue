<template>
  <div class="container">
    <div :class="`header ${hasAPPDownalod ? 'has-download' : ''}`" :style="`${isIOSMobile ? 'position:fixed' : ''}`">
      <div class="left">
        <div class="appicon-wrap">
          <img id="appicon" :src="`${cdnPath}${require('@/assets/img/sg1/appicon_pao.png')}`" />
        </div>
        <div class="text">
          <div>
            <div>泡泡直播&nbsp;激情不断</div>
            <div>24小时大尺度开播</div>
          </div>
        </div>
      </div>
      <div class="right">
        <template v-for="item in downloadList">
          <div v-if="showDownloadItem(item)" :key="`download-btn-${item.type}`" :class="`download-container`">
            <div :id="item.type" :class="`download-btn`" @click="handleClick(item)" :type="item.platform">
              {{ item.text }}
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="content">
      <img class="bodyimg" :src="`${cdnPath}${require('@/assets/img/sg1/image-up.gif')}`" />
      <img class="bodyimg" :src="`${cdnPath}${require('@/assets/img/sg1/image-center.gif')}`" />
      <img class="bodyimg" :src="`${cdnPath}${require('@/assets/img/sg1/image-down.gif')}`" />
    </div>

    <div class="footer">
      <div class="left">
        <div class="appicon-wrap">
          <img id="appicon" :src="`${cdnPath}${require('@/assets/img/sg1/appicon_pao.png')}`" />
        </div>
        <div class="text">
          <div>
            <div>香艳色播第一品牌</div>
            <div>即时观看性爱高潮</div>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 
          <div v-if="showDownloadItem(h5Item)" class="download-container-h5">
          <div :class="`download-btn`" @click="handleDownloadClick(h5Item)">
            {{ '去逛逛' }}
          </div>
        </div> 
        -->
        <template v-for="item in downloadList">
          <div v-if="showDownloadItem(item) && item.platform !== 'ios'" :key="`download-btn-${item.type}`" class="download-container-h5">
            <div :id="item.type" :class="`download-btn`" @click="handleClick(item)" :type="item.platform">
              {{ item.text }}
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="service-wrap">
      <div @click="linkTo('clientService')" id="service-link">
        <img id="appicon" :src="`${cdnPath}${require('@/assets/img/sg1/ic_service.png')}`" />
      </div>
    </div>
    <div v-if="isAndroidMobile" class="help-wrap">
      <a href="#intro" class="help-link">
        <img id="appicon" :src="`${cdnPath}${require('@/assets/img/sg1/ic_service.png')}`" />
      </a>
    </div>
    <modalBox v-show="showModal" @close="toogleModal(false)" />

    <div v-if="showDownloadqrcode" class="download-qrcode-wrap" @click="showDownloadqrcode = false">
      <div>
        <img class="close-img" :src="`${cdnPath}${require('@/assets/img/sg1/btn_close_w.png')}`" />
        <qrcode-vue class="download-qrcode" :value="qrcodeOpt.value" :size="qrcodeOpt.size"></qrcode-vue>
        <div class="qrcode-text">扫一扫下载泡泡直播</div>
      </div>
    </div>

    <a id="startApp" style="position=fixed;opacity=0;pointerEvents=none" href="javascript:void(0)"></a>
    <div v-if="isAndroidMobile" class="android-container" id="intro">
      <div class="logo">
        <img :src="`${cdnPath}${require('@/assets/img/andlogo.png')}`" :style="{ width: '42px', height: '23px' }" alt="" />
        <h2>android问题排除</h2>
      </div>
      <div class="desc">
        <span class="test" v-for="tab in tabItem" :key="tab.id" :class="{ active: currentTab == tab.id }" @click="setActive(tab.id)">
          {{ tab.desc }}
        </span>
      </div>
      <div class="content">
        <img v-show="currentTab == 1" :src="`${cdnPath}${require('@/assets/img/an_mobile_01.png')}`" alt="" />

        <div v-show="currentTab == 2" class="tab2-content">
          <img :src="`${cdnPath}${require('@/assets/img/an_mobile_02.png')}`" alt="" />
          <div class="button-wrap">
            <h3>请选择手机厂牌</h3>
            <button
              v-for="item in buttonList"
              :key="item.name"
              :class="[item.name, { active: currentButton == item.name }]"
              @click="setBtnActive(item.name)"
            >
              {{ item.name }}
            </button>
          </div>
          <img v-show="currentButton == 'oppo'" :src="`${cdnPath}${require('@/assets/img/an_mobile_03.png')}`" alt="" />
          <img v-show="currentButton == 'vivo'" :src="`${cdnPath}${require('@/assets/img/an_mobile_04.png')}`" alt="" />
          <img v-show="currentButton == 'huawei'" :src="`${cdnPath}${require('@/assets/img/an_mobile_05.png')}`" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import ModalBox from '../../common/modalBox.vue';
import DownloadMixin from '../../../lib/mixin/download';
import { isMobile } from '../../../lib/isMobile';
import qrcodeVue from 'qrcode.vue';

interface DownloadItem {
  text: string;
  type: string;
  platform: string;
}

@Options({
  components: {
    modalBox: ModalBox,
    qrcodeVue,
  },
})
export default class DonwloadSg1 extends mixins(DownloadMixin) {
  showDownloadqrcode = false;

  h5Item: DownloadItem = {
    text: '去逛逛',
    type: 'visit',
    platform: 'h5',
  };

  downloadList: DownloadItem[] = [
    {
      text: '下载APP',
      type: 'downloadPWA',
      platform: 'pwa',
    },
    {
      text: 'IOS下载',
      type: 'downloadIOS',
      platform: 'ios',
    },
    {
      text: '下载APP',
      type: 'downloadANDROID',
      platform: 'android',
    },
  ];

  get getIsMobile() {
    return isMobile();
  }

  qrcodeOpt = {
    value: '',
    size: 160,
  };

  currentTab = 1;
  currentButton = 'oppo';
  tabItem = [
    {
      id: 1,
      desc: '安裝威脅',
    },
    {
      id: 2,
      desc: '支付軟體報毒',
    },
  ];
  buttonList = [
    {
      name: 'oppo',
    },
    {
      name: 'vivo',
    },
    {
      name: 'huawei',
    },
  ];

  created() {
    this.qrcodeOpt.value = `${localStorage.getItem('referral-link')}`;
  }
  // mounted() {}

  handleClick(item) {
    if (isMobile()) {
      this.handleDownloadClick(item);
    } else {
      this.showDownloadqrcode = true;
    }
  }
  setActive(target): void {
    if (target) {
      this.currentTab = target;
    } else {
      return;
    }
  }

  setBtnActive(target): void {
    if (target) {
      this.currentButton = target;
    } else {
      return;
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/mobile/index.scss';
@import '~@/assets/css/variable/sg1.scss';
</style>
<style lang="scss" scoped>
$font_size: 16px;
$min_font_size: 10px;

.header {
  background-size: 100% 100%;
  background: #fff;
  box-shadow: 5px 5px 20px -10px rgb(0 0 0 / 20%);
  height: 81.2px;
  max-width: 420px;
  min-height: 0;
  position: sticky;
  width: 100%;
  display: block;
  z-index: 20;

  &.has-download {
    display: inline-flex;
  }
}

.left {
  align-items: center;
  display: flex;
  height: 100%;
  font-size: $font_size;
  justify-content: center;
  padding-left: 5px;
}

.right {
  align-items: center;
  color: white;
  display: flex;
  font-size: 14px;
  justify-content: center;
  height: 100%;
  width: 45%;
  position: absolute;
  right: 0;

  &:empty {
    display: none;
  }

  > .download-container:only-child {
    > div {
      padding: 4px 25px;
    }
  }
}

.appicon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;

  > img {
    width: 50px;
    height: 50px;
  }
}

.text {
  color: #000;
  display: inline-block;
  font-weight: 500;
  height: 100%;
  padding-left: 5px;

  > div {
    line-height: 20px;
    margin-top: 20px;
  }
}

.download-container {
  padding: 2px 1px 1.5px 0px;
  border: 1px solid white;
  background: linear-gradient(to bottom, #c02515, #488790);
  border-radius: 47px;
  margin: 0 auto;

  > div {
    padding: 2px 7px;
    background: #000;
    border-radius: 47px;
    min-width: 50px;
  }
}

.download-container-h5 {
  background: linear-gradient(to bottom, #c02515, #488790);
  color: #000;
  padding: 2px 1px 1.5px 0px;
  border-radius: 47px;
  min-width: 50px;
  font-weight: 500;

  > div {
    background: #fff;
    padding: 6px 36px;
    border: 1px solid #000;
    border-radius: 47px;
  }
}

// .content {
// padding-top: 81.2px;
//   padding-bottom: 97.44px;
// }

.bodyimg {
  width: 100%;
  margin: 0 auto;
}

.footer {
  background-color: rgba(0, 0, 0, 0.9);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  bottom: 0;
  color: white;
  display: flex;
  flex-wrap: nowrap;
  height: 81.2px;
  margin: 0;
  max-width: 420px;
  min-height: 0;
  padding: 0;
  position: sticky;
  width: 100%;
  z-index: 20;

  .text {
    color: white;
    font-weight: 500;
  }

  .appicon-wrap {
    > img {
      border: 1px solid #fff;
      border-radius: 10px;
    }
  }

  .right {
    margin: 0 auto;
  }
}

.service-wrap {
  position: fixed;
  max-width: 420px;
  width: 100%;
  display: flex;
  left: 50%;
  justify-content: flex-end;
  top: 48.5%;
  z-index: 20;
  transform: translateX(-50%);
  cursor: pointer;
}

#service-link {
  width: 60px;
  height: 40px;
  transition: transform 0.2s; /* Animation */

  > img {
    width: 100%;
  }

  :hover {
    transform: scale(1.15);
  }
}

.help-wrap {
  position: fixed;
  max-width: 420px;
  width: 100%;
  display: flex;
  left: 50%;
  justify-content: flex-end;
  top: 55%;
  z-index: 20;
  transform: translateX(-50%);
}

.help-link {
  width: 60px;
  height: 40px;
  transition: transform 0.2s; /* Animation */
  > img {
    width: 100%;
  }

  :hover {
    transform: scale(1.15);
  }
}

@media only screen and (max-width: 414px) {
  .help-link {
    :hover {
      transform: scale(1);
    }
  }
}

@media only screen and (min-width: 245px) and (max-width: 340px) {
  .help-wrap {
    top: 56%;
  }
}

.download-qrcode-wrap {
  opacity: 1;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  -ms-touch-action: none;
  touch-action: none;
  -webkit-overflow-scrolling: none;

  > div {
    -webkit-transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    left: 50%;
    padding: 16px;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }

  .qrcode-text {
    margin-top: 10px;
    font-size: 16px;
    color: black;
  }
}

.close-img {
  position: absolute;
  right: 0;
  top: -30px;
  width: 30px;
}

@media only screen and (min-width: 245px) and (max-width: 340px) {
  .left {
    font-size: $min_font_size;
  }
}

.android-container {
  width: 100%;
  height: 100vh;

  .logo {
    display: flex;
    color: #32dd81;
    justify-content: center;
    align-items: center;
    margin: 15px 0;

    h2 {
      margin-left: 5px;
      font-size: 25px;
      font-weight: bold;
    }
  }

  .desc {
    width: 100%;
    text-align: center;
    font-size: 18px;
    letter-spacing: 1px;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 3px 2.5px 0 rgb(0 0 0 / 8%);
    cursor: pointer;
    span {
      display: block;
      width: 48%;
      padding: 10px 0;
      &.active {
        color: #32dd81;
        border-bottom: 5px solid #32dd81;
      }
    }
  }

  .content {
    width: 100%;
    img {
      max-width: 100%;
      height: auto;
    }
  }

  .button-wrap {
    background-color: #f3f3f3;
    text-align: center;
    padding: 20px 0;
    button {
      width: 83px;
      height: 32px;
      border: none;
      margin: 5px;
      border-radius: 3px;
      background-color: #fff;
      font-size: 9px;
      font-weight: bold;
      cursor: pointer;
      &.oppo {
        &.active {
          background-color: #0d6a30;
          color: #fff;
        }
      }
      &.vivo {
        &.active {
          background-color: #425eff;
          color: #fff;
        }
      }
      &.huawei {
        &.active {
          background-color: #d41c26;
          color: #fff;
        }
      }
    }
  }
}
</style>
