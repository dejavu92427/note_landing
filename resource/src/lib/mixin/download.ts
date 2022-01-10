import { Action, Getter } from 'vuex-class';
import { ICommonConfig, IDownloadConfig, ISiteConfig } from '../interface';
import Swiper, { Pagination } from 'swiper';
import { isAndroid, isIOS, isMobile, isSafari } from '../../lib/isMobile';

import ProgressBar from 'progressbar.js';
import { SwiperOptions } from 'swiper';
import { Vue } from 'vue-class-component';

interface DownloadItem {
  text: string;
  type: string;
  platform: string;
}

export default class DownloadMixin extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('getLCFSystemConfig') getLCFSystemConfig!: Function;
  @Action('getDownloadUri') getDownloadUri!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;
  @Action('actionSentAnalysis') actionSentAnalysis!: Function;
  @Action('getHostnames') getHostnames!: Function;

  @Getter('getCommonList') commonList!: ICommonConfig;
  @Getter('getCDN') cdnPath!: string;
  @Getter('getVersion') version!: string;
  @Getter('getDonwloadConfig') downloadConfig!: IDownloadConfig;
  @Getter('getSiteConfig') siteConfig!: ISiteConfig;

  isIOSDownloadStatus = false;
  isDownloadPub = false;
  isDownloading = false;
  progessDone = false;
  downloadText = '正在下载...'; // 一键信任
  showModal = false;

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
    this.getHostnames();
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

  handleDownload(target): void {
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
    if (this.isDownloading) {
      return;
    }
    this.isDownloading = true;

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
        break;

      case 'h5':
        this.linkTo(target.type);
        break;
    }

    this.actionSentAnalysis({ eventType: target.type });
  }
}
