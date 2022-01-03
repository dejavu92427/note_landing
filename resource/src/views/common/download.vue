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
        <img :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/logo.png`)}`" />
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

        <div v-if="['sp1'].includes(siteConfig.routerTpl)">
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
      <div class="donwload-tip title">
        下滑查看安装教程
        <img class="donwload-tip-arrow" :src="`${cdnPath}${require('@/assets/img/jiantou.png')}`" />
      </div>

      <div v-if="isIOSMobile" class="download_img">
        <div class="apple-icon"><img :src="`${cdnPath}${require('@/assets/img/apple.png')}`" /></div>
        <img class="tutorial" :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/tutorial_ios.png`)}`" />
      </div>

      <div v-if="isAndroidMobile" class="download_img">
        <div class="apple-icon"><img :src="`${cdnPath}${require('@/assets/img/android.png')}`" /></div>
        <img class="tutorial" :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/tutorial_and.png`)}`" />
      </div>
    </div>
    <div class="version">{{ verison }}</div>

    <modalBox v-show="showModal" @close="toogleModal(false)" />
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import { ICommonConfig, IDownloadConfig, ISiteConfig } from '../../lib/interface';
import Swiper, { Pagination } from 'swiper';
import { isAndroid, isIOS, isMobile, isSafari } from '../../lib/isMobile';

import ModalBox from './modalBox.vue';
import { Options } from 'vue-class-component';
import ProgressBar from 'progressbar.js';
import { SwiperOptions } from 'swiper';
import { Vue } from 'vue-class-component';

interface DownloadItem {
  text: string;
  type: string;
  platform: string;
}
@Options({
  components: {
    modalBox: ModalBox,
  },
  // mixins: [DownloadMixin],
})
export default class DownloadCommon extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('getLCFSystemConfig') getLCFSystemConfig!: Function;
  @Action('getDownloadUri') getDownloadUri!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;
  @Action('actionSentAnalysis') actionSentAnalysis!: Function;

  @Getter('getDonwloadConfig') downloadConfig!: IDownloadConfig;
  @Getter('getSiteConfig') siteConfig!: ISiteConfig;
  @Getter('getCommonList') commonList!: ICommonConfig;
  @Getter('getCDN') cdnPath!: string;
  @Getter('getVersion') version!: string;

  downloadList: DownloadItem[] = [
    {
      text: '去逛逛',
      type: 'visit',
      platform: 'h5',
    },
    {
      text: '极速版下载',
      type: 'downloadPWA',
      platform: 'pwa',
    },
    {
      text: 'IOS版下载',
      type: 'downloadIOS',
      platform: 'ios',
    },
    {
      text: 'ANDROID版下载',
      type: 'downloadANDROID',
      platform: 'android',
    },
    // {
    //   show: false,
    //   text: '隐藏版下载',
    //   type: '',
    //   platform:'',
    // }
  ];

  isIOSDownloadStatus = false;
  isDownloadPub = false;
  isDownloading = false;
  progessDone = false;
  downloadText = '正在下载...'; // 一键信任
  showModal = false;

  // computed
  get verison() {
    return this.version;
  }

  get recommendText() {
    if (isAndroid()) {
      return '若无法正常安装，请使用手机自带浏览器打开本页面（寰宇浏览器、Chrome谷歌浏览器）';
    } else {
      return '若无法正常安装，请使用手机自带浏览器打开本页面（苹果浏览器Safari）';
    }
  }

  get isIOSMobile() {
    return isIOS();
  }

  get isAndroidMobile() {
    return isAndroid();
  }

  get hasAPPDownalod() {
    if (localStorage.getItem('code')) {
      return false;
    }

    if (!this.downloadConfig.android.show || !this.downloadConfig.ios.show || !this.downloadConfig.pwa.show) {
      return false;
    }

    return true;
  }

  created() {
    console.log('isMobile:', isMobile());
    this.getLCFSystemConfig();

    // 泡泡無PC版頁面
    if (this.siteConfig.routerTpl === 'sg1') {
      return;
    }

    // if (isMobile()) {
    //   // 是否保留推廣代碼
    //   // this.$router.push('/download');
    // } else {
    //   this.$router.push('/pc');
    // }
  }

  mounted() {
    if (document.getElementById('swiper-container')) {
      const swiperOptions: SwiperOptions = {
        observer: true,
        observeParents: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        },
        slidesPerView: 'auto',
        spaceBetween: 25,
      };
      Swiper.use([Pagination]);

      const swiper = new Swiper('#swiper-container', swiperOptions);
      this.$nextTick(() => {
        if (swiper && swiper.pagination) {
          swiper.updateSlides();
          swiper.pagination.update();
        }
      });
    }
  }

  showDownloadItem(target: DownloadItem): boolean {
    // 去逛逛
    if (target.platform === 'h5') {
      return this.downloadConfig['h5'].show;
    }

    // 推廣代碼不顯示下載APP
    if (localStorage.getItem('code')) {
      return false;
    }

    if ((isAndroid() && target.platform === 'android') || (isIOS() && target.platform === 'pwa') || (isIOS() && target.platform === 'ios')) {
      return this.downloadConfig[target.platform as keyof IDownloadConfig].show;
    }

    if (!isMobile() && ((isSafari() && target.platform === 'ios') || (!isSafari() && target.platform === 'android'))) {
      return this.downloadConfig[target.platform as keyof IDownloadConfig].show;
    } else {
      return false;
    }
  }

  handleDownloadClick(target: DownloadItem) {
    switch (target.platform) {
      case 'ios': {
        this.isIOSDownloadStatus = true;

        if (this.progessDone) {
          this.downloadPubMobile();
          return;
        }
        this.handleDownload(target);
        break;
      }

      case 'pwa': {
        if (!isSafari()) {
          this.toogleModal(true);
          return;
        }
        this.handleDownload(target);
        break;
      }

      case 'android':
      case 'hide':
        this.handleDownload(target);
        return;

      case 'h5':
        this.linkTo(target.type);
        return;
    }

    this.actionSentAnalysis({ eventType: target.type });
  }

  handleDownload(target: DownloadItem): void {
    if (this.isDownloading) {
      return;
    }

    this.isDownloading = true;
    const bundleID = this.downloadConfig[target.platform as keyof IDownloadConfig].bundleID;
    let platform = '';

    const getDownloadUri = (platformType) => {
      this.getDownloadUri({ bundleID: bundleID, platform: platformType }).then((result: string) => {
        if (result && result.length > 0) {
          const a = document.createElement('a');
          a.href = result;
          document.body.appendChild(a);
          a.click();

          // 強制二次下載跳轉描述檔確認頁
          switch (target.platform) {
            case 'pwa': {
              this.downloadPubMobile(false);
              break;
            }
          }
          setTimeout(() => {
            this.isDownloading = false;
          }, 1500);
          document.body.removeChild(a);
        }
      });
    };

    switch (target.platform) {
      case 'ios':
        {
          platform = '1';

          if (this.siteConfig.routerTpl === 'sg1') {
            this.progessDone = true;
            getDownloadUri(platform);
            break;
          }

          this.$nextTick(() => {
            const circle = new ProgressBar.Circle('#circle-progess', {
              strokeWidth: 3,
              easing: 'linear',
              duration: 1500,
              color: '#3354ad',
              trailColor: '#e6e1dc',
              trailWidth: 3,
              svgStyle: null,
              step: (e, t) => {
                const r = Math.round(100 * t.value());
                t.setText(r + '%');
                if (+r >= 100) {
                  this.progessDone = true;
                  this.downloadText = '一键信任';
                }
              },
            });

            setTimeout(() => {
              circle.animate(1);
            }, 1000);
          });

          getDownloadUri(platform);
        }
        break;

      case 'pwa':
        platform = '2';
        getDownloadUri(platform);
        break;

      case 'android':
        platform = '3';
        getDownloadUri(platform);
        break;

      case 'hide':
        platform = '4';
        getDownloadUri(platform);
        break;
    }
  }

  linkTo(target): void {
    this.actionLinkTo(target);
  }

  downloadPubMobile(isIOS = true) {
    if (isIOS) {
      window.location.href = './pub.mobileprovision';
    } else {
      const focusHandler = () => {
        if (this.isDownloadPub) return;
        this.isDownloadPub = true;
        window.location.href = './pub.mobileprovision';
        window.removeEventListener('focus', focusHandler);
      };

      window.addEventListener('focus', focusHandler);
    }
  }

  toogleModal(toogle: boolean) {
    this.showModal = toogle;
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/mobile/index.scss';
</style>
<style lang="scss" scoped>
@import '~@/assets/css/mobile/download.scss';
</style>
