<template>
  <div class="container">
    <div :class="`header ${hasAPPDownalod ? 'has-download' : ''} `" :style="`${isIOSMobile ? 'position:fixed' : ''}`">
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

    <div class="content" :style="`${isIOSMobile ? 'padding-top:81.2px' : ''}`">
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
    <div v-if="!isIOSMobile" class="help-wrap">
      <a href="#intro" class="help-link">
        <img id="appicon" :src="`${cdnPath}${require('@/assets/img/sg1/ic_android.png')}`" />
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
    <div v-if="!isIOSMobile" class="android-container" id="intro">
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
        <div v-show="currentTab == 1" class="tab1-content">
          <div class="q-wrap" :style="{ 'background-image': `url(${cdnPath}${require(`@/assets/img/andorid_virus_help/m_bg.jpg`)})` }">
            <p class="top-warning">本软体为最高安全等级，请安心下载畅游</p>
            <div class="title-wrap">
              <span>Q</span>
              <h3>我的问题</h3>
            </div>
            <p class="intro-text">安装软体时，遇到内建防护软体报毒。</p>
            <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/Install_que.jpg')}`" alt="" />
          </div>
          <div class="a-wrap">
            <div class="title-wrap">
              <span>A</span>
              <h3>问题排除</h3>
            </div>
            <p class="intro-text">请点击【继续安装】或【无视风险安装】，即可完成安装。</p>
            <img class="logo" :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/logo1_2.png')}`" alt="" />
            <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/Install_ans01.jpg')}`" alt="" />
            <img class="logo" :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/logo2_2.png')}`" alt="" />
            <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/Install_ans02.jpg')}`" alt="" />
            <img class="logo" :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/logo3_2.png')}`" alt="" />
            <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/Install_ans03.jpg')}`" alt="" />
          </div>
        </div>
        <div v-show="currentTab == 2" class="tab2-content">
          <div class="q-wrap" :style="{ 'background-image': `url(${cdnPath}${require(`@/assets/img/andorid_virus_help/m_bg.jpg`)})` }">
            <p class="top-warning">本软体为最高安全等级，请安心下载畅游</p>
            <div class="title-wrap">
              <span>Q</span>
              <h3>我的问题</h3>
            </div>
            <p class="intro-text">开启支付软体，出现本软体为病毒危险提示。</p>
            <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/way_que.png')}`" alt="" />
          </div>
          <div class="button-wrap">
            <h3>请选择手机厂牌</h3>
            <button
              v-for="item in buttonList"
              :key="item.name"
              :class="[`${item.name.toLowerCase()}`, { active: currentButton == `${item.name.toLowerCase()}` }]"
              @click="setBtnActive(item.name)"
            >
              {{ item.name }}
            </button>
          </div>
          <div class="a-wrap">
            <div class="title-wrap">
              <span>A</span>
              <h3>问题排除</h3>
            </div>
            <div class="ans">
              <div v-show="currentButton == 'oppo'">
                <h4>操作步骤</h4>
                <p>请至【手机管家 > 支付保护】 将使用的支付应用【关闭检测】，即可正常使用。</p>

                <h5>步骤 1</h5>
                <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/oppo_ans01.jpg')}`" alt="" />
                <h5>步骤 2</h5>
                <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/oppo_ans02.png')}`" alt="" />
              </div>
              <div v-show="currentButton == 'vivo'">
                <h4>操作步骤</h4>
                <p>请至【i 管家(更多) > 公用程式工具 > 支付保险箱 > 管理应用程式】将使用的支付应用【关闭检测】，即可正常使用。</p>

                <h5>步骤 1</h5>
                <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/vivo_ans01.jpg')}`" alt="" />
                <h5>步骤 2</h5>
                <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/vivo_ans02.jpg')}`" alt="" />
                <h5>步骤 3</h5>
                <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/vivo_ans03.jpg')}`" alt="" />
              </div>
              <div v-show="currentButton == 'huawei'">
                <h4>操作步骤</h4>
                <p>请至【设置 > 安全 > 支付保护中心】将使用的支付应用【关闭检测】，即可正常使用。</p>

                <h5>步骤 1</h5>
                <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/huawei_ans01.jpg')}`" alt="" />
                <h5>步骤 2</h5>
                <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/huawei_ans02.jpg')}`" alt="" />
                <h5>步骤 3</h5>
                <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/huawei_ans03.jpg')}`" alt="" />
              </div>
            </div>
          </div>
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
      desc: '安装威胁',
    },
    {
      id: 2,
      desc: '支付软体报毒',
    },
  ];
  buttonList = [
    {
      name: 'OPPO',
    },
    {
      name: 'VIVO',
    },
    {
      name: 'Huawei',
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
      this.currentButton = target.toLowerCase();
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
// padding-bottom: 97.44px;
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
      font-size: 25px;
      font-weight: bold;
      margin-left: 5px;
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
    span {
      display: block;
      width: 48%;
      color: #666666;
      &.active {
        color: #32dd81;

        &::after {
          content: '';
          display: block;
          margin: 0 auto;
          margin-top: 15px;
          width: 80%;
          height: 6px;
          background-color: #32dd81;
        }
      }
    }
  }

  .content {
    width: 100%;
    margin: 6px 0 0;
    img {
      max-width: 100%;
      height: auto;
      border: 1px solid #e8e8e8;
    }
  }

  .tab1-content {
    background: #f3f3f3;

    .q-wrap {
      padding: 30px;
      .top-warning {
        color: #d41c26;
        text-align: center;
      }
      .intro-text {
        color: #666666;
        margin: 20px 0;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .a-wrap {
      padding: 0 30px 30px;

      .intro-text {
        color: #666666;
        margin: 20px 0;
        font-size: 16px;
        font-weight: bold;
      }

      .logo {
        width: 162px;
        height: 60px;
        margin-top: 20px;
        border: none;
      }
    }

    img {
      display: block;
      margin: 0 auto;
      border-radius: 15px;
      border: 1px solid #e8e8e8;
    }
  }

  .title-wrap {
    margin-top: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    left: -30px;
    span {
      display: block;
      width: 80px;
      height: 46px;
      color: #fff;
      background: linear-gradient(180deg, #32de84, #0fb960);
      font-size: 30px;
      font-weight: bold;
      border-radius: 0 23px 23px 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    h3 {
      color: #212121;
      margin-left: 15px;
    }
  }

  .tab2-content {
    background: #f3f3f3;

    .q-wrap {
      padding: 30px;
      .top-warning {
        color: #d41c26;
        text-align: center;
      }
      .intro-text {
        color: #666666;
        margin: 20px 0;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .a-wrap {
      padding: 0 30px 30px;

      .ans {
        width: 100%;
        border: 1px solid #e0e0e0;
        background: rgba(255, 255, 255, 0.5);
        padding: 15px;
        border-radius: 15px;
        font-weight: bold;
        h4 {
          font-size: 20px;
          color: #212121;
        }
        p {
          font-size: 16px;
          color: #666666;
        }
        h5 {
          font-size: 16px;
          color: #212121;
        }
      }
    }

    img {
      display: block;
      margin: 0 auto;
      border-radius: 15px;
    }
  }

  .button-wrap {
    background-color: #f3f3f3;
    text-align: center;
    padding: 15px 0;
    button {
      width: 29%;
      height: 50px;
      border: none;
      margin: 5px;
      border-radius: 3px;
      background-color: #fff;
      font-size: 18px;
      font-weight: bold;
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
