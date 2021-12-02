<template>
  <div class="container">
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <!-- <div>
      <img class="swiper-slide-img" src="@/assets/img/sports_main.png" />
    </div> -->

    <div class="swiper-wrap">
      <swiper :loop="true" :slidesPerView="'auto'">
        <swiper-slide>
          <div class="swiper-slide-img">
            <img :src="`${cdnPath}${require('@/assets/img/porn1/sports_main.png')}`" />
            <!-- <img src="@/assets/static/image/porn1/common/logo.png" /> -->
            <!-- https://ya.jingliangjiu.cn/static/image/porn1/common/logo.png?v=36612412.1 -->
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div v-if="isIOSDownloadStatus">
      <div :class="`download-container downloading`">
        <button v-if="showDownloadItem(downloadList[0])" :id="downloadList[0].type" :class="`download-btn`" @click="handleClick(downloadList[0])">
          {{ downloadList[0].text }}
        </button>

        <div id="circle-progess" class="progress" />
        <div id="trust-btn" :class="`download-btn ${progessDone ? 'done' : 'downloading'}`" @click="handleClick(downloadList.find((i) => i.platform === 'ios'))">
          {{ downloadText }}
        </div>
      </div>
    </div>

    <div v-else class="download-wrap">
      <template v-for="item in downloadList">
        <div v-if="showDownloadItem(item)" :key="`download-btn-${item.type}`" :class="`download-container`">
          <button :id="item.type" :class="`download-btn`" @click="handleClick(item)">
            {{ item.text }}
          </button>
        </div>
      </template>
    </div>

    <div class="donwload-tip">
      <div>
        需在同一网络环境下载安装，请勿切换网络；
        <span class="recommend-text">若无法正常安装，请使用手机自带浏览器打开本页面（苹果浏览器Safari）</span>
      </div>
      <div>
        如需帮助，
        <a @click="linkTo('clientService')" class="link" target="_blank">请联系客服</a>
      </div>
    </div>

    <div class="version">{{ verison }}</div>

    <modalBox v-show="showModal" @close="toogleModal(false)" />
  </div>
</template>

<script lang="ts">
import { Getter, Action } from 'vuex-class';
import { ICommonConfig } from '../../../lib/interface';
import { IDownloadConfig, ISiteConfig } from '../../../lib/interface';
import { isAndroid, isIOS, isMobile, isSafari } from '../../../lib/isMobile';
import { Options, Vue } from 'vue-class-component';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { SwiperOptions } from 'swiper';
import ProgressBar from 'progressbar.js';
import ModalBox from '../../common/modalBox.vue';

interface DownloadItem {
  text: string;
  type: string;
  platform: string;
}

@Options({
  components: {
    swiper: Swiper,
    swiperSlide: SwiperSlide,
    modalBox: ModalBox,
  },
})
export default class HomePorn1 extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('getLCFSystemConfig') getLCFSystemConfig!: Function;
  @Action('getDownloadUri') getDownloadUri!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;
  @Action('actionSentAnalysis') actionSentAnalysis!: Function;

  @Getter('getDonwloadConfig') downloadConfig!: IDownloadConfig;
  @Getter('getSiteConfig') siteConfig!: ISiteConfig;
  @Getter('getCommonList') commonList!: ICommonConfig;
  @Getter('getHostnames') hostnames!: string[];
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
  swiper: any = {};
  swiperOpts: SwiperOptions = {
    loop: true,
  };

  isIOSDownloadStatus = false;
  isDownloadPub = false;
  isDownloading = false;
  progessDone = false;
  downloadText = '正在下载...'; // 一键信任
  showModal = false;

  get verison() {
    return this.version;
  }

  beforeUnmount() {
    // window.removeEventListener('focus');
  }

  created() {
    console.log('isMobile:', isMobile());
    this.getLCFSystemConfig();
    if (isMobile()) {
      this.$router.push('/download');
    } else {
      this.$router.push('/pc');
    }
  }

  mounted() {
    // this.swiper = new Swiper('#swiper-container', {
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   pagination: {
    //     el: '.swiper-pagination'
    //   }
    // });
  }

  showDownloadItem(target: DownloadItem): boolean {
    // 推廣代碼不顯示下載APP
    if (localStorage.getItem('code') && (target.platform === 'ios' || target.platform === 'android')) {
      return false;
    }

    if ((isIOS() && target.platform === 'pwa') || (isAndroid() && target.platform === 'android') || (isIOS() && target.platform === 'ios') || target.platform === 'h5') {
      return this.downloadConfig[target.platform as keyof IDownloadConfig].show;
    } else {
      return false;
    }
  }

  handleClick(target: DownloadItem) {
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

    this.actionSentAnalysis(target.type);
  }

  handleDownload(target: DownloadItem): void {
    if (this.isDownloading) {
      return;
    }

    this.isDownloading = true;
    const bundleID = this.downloadConfig[target.platform as keyof IDownloadConfig].bundleID;
    let platform = '';
    switch (target.platform) {
      case 'ios':
        {
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
                if (r === 100) {
                  this.progessDone = true;
                  this.downloadText = '一键信任';
                }
              },
            });

            setTimeout(() => {
              circle.animate(1);
            }, 1000);
          });
        }
        platform = '1';
        break;
      case 'pwa':
        platform = '2';
        break;
      case 'android':
        platform = '3';
        break;
      case 'hide':
        platform = '4';
        break;
    }

    const params = {
      bundleID: bundleID,
      platform: platform,
    };

    this.getDownloadUri(params).then((result: string) => {
      if (result && result.length > 0) {
        this.download(result, target.platform);
      }
    });
  }

  linkTo(target): void {
    this.actionLinkTo(target);
  }

  download(href: string, platform: string) {
    const a = document.createElement('a');
    a.href = href;
    document.body.appendChild(a);
    a.click();

    // 強制二次下載跳轉描述檔確認頁
    switch (platform) {
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

<style lang="scss" scoped>
@import url('~@/assets/css/mobile/index.scss');

.container {
  position: relative;
  font-size: 14px;
  padding: 0 14px;
}

.swiper-wrap {
  width: 100%;
  margin-top: 12px;
}

.swiper-slide-img {
  width: 100%;
  text-align: center;

  > img {
    width: 100%;
    height: auto;
  }
}

// 下載按鈕
.download-wrap {
  width: 100%;

  display: flex;
  position: relative;
}

.download-container {
  display: flex;
  position: relative;
  text-align: center;
  justify-content: center;
  width: 100%;
}

.download-btn {
  -moz-appearance: auto;
  -webkit-animation: install-button 0.66s ease-in-out;
  -webkit-appearance: auto;
  animation: install-button 0.66s ease-in-out;
  appearance: auto;
  background: #3354ad;
  border-radius: 18px;
  border: unset;
  color: white;
  font-family: PingFangSC-Regular, sans-serif;
  font-size: 13px;
  height: 36px;
  outline: none;
  text-decoration: none;
  text-decoration: none;
  width: 90%;
}

#trust-btn {
  opacity: 0.5;
  color: white;
  line-height: 36px;
  width: 180%;

  &.donwloading {
    opacity: 0.5;
    pointer-events: none;
  }

  &.done {
    opacity: 1;
    pointer-events: unset;
  }
}

.progress {
  display: flex;
  position: relative;
  text-align: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  margin: 0 12px;
}

.progressbar-text {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #3354ad !important;
}

.donwload-tip {
  font-size: 12px;
  line-height: 18px;
  color: #666666;
  text-align: center;
  padding: 14px 7px;

  .link {
    font-family: Microsoft JhengHei, Microsoft JhengHei-Regular;
    font-weight: 400;
    color: #6aaaf5;
  }

  > div:nth-child(2) {
    margin-top: 12px;
  }
}

.version {
  bottom: 7px;
  color: gainsboro;
  font-size: 12px;
  position: fixed;
  right: 12px;
}
</style>
