<template>
  <div class="container" :style="{ 'background-image': `url(${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/bg.png`)})` }">
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <!-- <div>
      <img class="swiper-slide-img" src="@/assets/img/sports_main.png" />
    </div> -->

    <div class="logo-wrap">
      <template v-if="['porn1'].includes(siteConfig.routerTpl)">
        <img class="bifa-logo" :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/bifa_logo.png`)}`" />
      </template>
      <template v-else>
        <img :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/logo.png`)}`" :class="siteConfig.routerTpl === 'sp1' ? 'b' : {}" />
      </template>
    </div>

    <div class="swiper-wrap">
      <div id="swiper-container">
        <div v-if="['porn1'].includes(siteConfig.routerTpl)" class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <!-- <img :src="`${cdnPath}${(item.src)}`" /> -->
              <img :src="`${cdnPath}${require('@/assets/img/porn1/sports_main.png')}`" />
            </div>
          </div>
        </div>

        <div v-if="['aobo1'].includes(siteConfig.routerTpl)" class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/img_01.png')}`" />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/img_02.png')}`" />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/img_03.png')}`" />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/img_04.png')}`" />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/img_05.png')}`" />
            </div>
          </div>
        </div>

        <div v-if="['sp1'].includes(siteConfig.routerTpl)" class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/sp1/main_01.png')}`" />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/sp1/main_02.png')}`" />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/sp1/main_03.png')}`" />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/sp1/main_04.png')}`" />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/sp1/main_05.png')}`" />
            </div>
          </div>
        </div>

        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div v-if="isIOSDownloadStatus">
      <div :class="`download-container downloading`">
        <button
          v-if="showDownloadItem(downloadList[0])"
          :id="downloadList[0].type"
          :class="`download-btn ${siteConfig.routerTpl}`"
          @click="handleDownloadClick(downloadList[0])"
        >
          {{ downloadList[0].text }}
        </button>

        <div id="circle-progess" class="progress" />
        <div
          id="trust-btn"
          :class="`download-btn ${progessDone ? 'done' : 'downloading'} ${siteConfig.routerTpl}`"
          @click="handleDownloadClick(downloadList.find((i) => i.platform === 'ios'))"
        >
          {{ downloadText }}
        </div>
      </div>
    </div>

    <div v-else class="download-wrap">
      <template v-for="item in downloadList">
        <div v-if="showDownloadItem(item)" :key="`download-btn-${item.type}`" :class="`download-container`">
          <button :id="item.type" :class="`download-btn ${siteConfig.routerTpl}`" @click="handleDownloadClick(item)" :type="item.platform">
            {{ item.text }}
          </button>
        </div>
      </template>
    </div>

    <div class="donwload-tip">
      <div>
        需在同一网络环境下载安装，请勿切换网络；
        <span class="recommend-text">{{ recommendText }}</span>
      </div>
      <div v-if="['porn1'].includes(siteConfig.routerTpl)">
        如需帮助，
        <a @click="linkTo('clientService')" class="link" target="_blank">请联系客服</a>
      </div>
    </div>

    <div v-if="['aobo1', 'sp1'].includes(siteConfig.routerTpl)" class="download-tip-extra">
      <div @click.stop="copy" class="donwload-tip title">
        下滑查看安装教程
        <img class="donwload-tip-arrow" :src="`${require(`@/assets/img/jiantou.png`)}`" />
      </div>

      <div v-if="isIOSMobile" class="download_img">
        <div class="apple-icon"><img :src="`${require(`@/assets/img/apple.png`)}`" /></div>
        <img class="tutorial" :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/tutorial_ios.png`)}`" />
      </div>

      <!-- isAndroidMobile -->
      <div v-else class="download_img">
        <div class="apple-icon"><img :src="`${require('@/assets/img/android.png')}`" /></div>
        <img class="tutorial" :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/tutorial_and.png`)}`" />
      </div>
    </div>
    <div class="version">{{ verison }}</div>

    <modalBox v-show="showModal" @close="toogleModal(false)" />
  </div>
</template>

<script lang="ts">
import ModalBox from './modalBox.vue';
import { mixins, Options } from 'vue-class-component';
import DownloadMixin from '../../lib/mixin/download';

declare global {
  const DeviceInfo: {
    getDeviceInfo: any;
  };
}

@Options({
  components: {
    modalBox: ModalBox,
  },
  // mixins: [DownloadMixin],
})
export default class DownloadCommon extends mixins(DownloadMixin) {
  copy() {
    const info = DeviceInfo.getDeviceInfo();
    // document.addEventListener('copy', function (e: any) {
    //   e.clipboardData.setData('text/html', e);
    //   e.preventDefault(); // default behaviour is to copy any selected text
    // });

    const container = document.createElement('img');
    container.setAttribute('id', 'hello');
    container.setAttribute('src', JSON.stringify(info));

    container.style.position = 'fixed';
    container.style.pointerEvents = 'none';
    container.style.opacity = '0';

    const activeSheets = Array.prototype.slice.call(document.styleSheets).filter(function (sheet) {
      return !sheet.disabled;
    });

    document.body.appendChild(container);
    window?.getSelection()?.removeAllRanges();

    const range = document.createRange();
    range.selectNode(container);

    window?.getSelection()?.addRange(range);

    document.execCommand('copy');

    for (let i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false;
    document.body.removeChild(container);
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/mobile/index.scss';
</style>
<style lang="scss" scoped>
@import '~@/assets/css/mobile/download.scss';
</style>
