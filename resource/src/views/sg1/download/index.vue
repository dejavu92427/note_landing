<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <div class="appicon-wrap">
          <img id="appicon" :src="`${cdnPath}${require('@/assets/img/sg1/appicon_pao.png')}`" />
        </div>
        <div class="text">
          <span>泡泡直播&nbsp;激情不断</span>
          <br />
          <span>24小时大尺度开播</span>
        </div>
      </div>
      <div class="right">
        <template v-for="item in downloadList">
          <div v-if="showDownloadItem(item)" :key="`download-btn-${item.type}`" :class="`download-container`">
            <div :id="item.type" :class="`download-btn ${siteConfig.routerTpl}`" @click="handleClick(item)">
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
          <span>香艳色播第一品牌&nbsp;</span>
          <br />
          <span>即时观看性爱高潮</span>
        </div>
      </div>
      <div class="right">
        <div v-if="showDownloadItem(h5Item)" class="download-container-h5">
          <div :class="`download-btn ${siteConfig.routerTpl}`" @click="handleClick(h5Item)">
            {{ '去逛逛' }}
          </div>
        </div>
      </div>
    </div>

    <div class="service-wrap">
      <div @click="linkTo('clientService')" id="service-link">
        <img id="appicon" :src="`${cdnPath}${require('@/assets/img/sg1/ic_service.png')}`" />
      </div>
    </div>

    <modalBox v-show="showModal" @close="toogleModal(false)" />
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import ModalBox from '../../common/modalBox.vue';
import DownloadMixin from '../../../lib/mixin/download';

interface DownloadItem {
  text: string;
  type: string;
  platform: string;
}

@Options({
  components: {
    modalBox: ModalBox,
  },
})
export default class DonwloadSg1 extends mixins(DownloadMixin) {
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

  // created() {}
  // mounted() {}
}
</script>

<style lang="scss">
@import '~@/assets/css/mobile/index.scss';
</style>
<style lang="scss" scoped>
.header {
  background-size: 100% 100%;
  background: #fff;
  box-shadow: 5px 5px 20px -10px rgb(0 0 0 / 20%);
  display: flex;
  flex-wrap: nowrap;
  height: 81.2px;
  max-width: 420px;
  min-height: 0;
  position: fixed;
  width: 100%;
  width: 100%;
  z-index: 20;
}

.left {
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  flex: 1 1 55%;
  font-size: 16px !important;
  justify-content: space-around;
  margin: auto;
}

.right {
  flex: 1 1 45%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: 14px;
}

.appicon-wrap {
  width: 50px;
  height: 100%;

  > img {
    width: 50px;
    height: 50px;
  }
}

.text {
  color: #000;
  font-weight: 500;
}

.download-container {
  padding: 2px 1px 1.5px 0px;
  border: 1px solid white;
  background: linear-gradient(to bottom, #c02515, #488790);
  border-radius: 47px;

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

.content {
  padding-top: 81.2px;
  padding-bottom: 97.44px;
}

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
  position: fixed;
  width: 100%;
  z-index: 20;

  .text {
    color: white;
    font-weight: 500;
  }
}

.service-wrap {
  position: fixed;
  max-width: 420px;
  width: 100%;
  display: flex;
  left: 50%;
  justify-content: flex-end;
  top: 50%;
  z-index: 10;
  transform: translateX(-50%);
}

#service-link {
  width: 60px;
  height: 40px;

  > img {
    width: 100%;
  }
}
</style>
