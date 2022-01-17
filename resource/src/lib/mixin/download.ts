import { Action, Getter } from 'vuex-class';
import { EncryptInfo, InitInstallInfo } from '../../lib/install';
import { IAgentChannel, ICommonConfig, IDownloadConfig, ISiteConfig } from '../interface';
import Swiper, { Pagination } from 'swiper';
import { isAndroid, isIOS, isMobile, isSafari } from '../../lib/isMobile';

import ProgressBar from 'progressbar.js';
import { SwiperOptions } from 'swiper';
import { Vue } from 'vue-class-component';
import { initRouterReferralCode } from '../referralCode';

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
  @Action('setAgentDeviceInfo') setAgentDeviceInfo!: Function;

  @Getter('getCommonList') commonList!: ICommonConfig;
  @Getter('getCDN') cdnPath!: string;
  @Getter('getVersion') version!: string;
  @Getter('getDonwloadConfig') downloadConfig!: IDownloadConfig;
  @Getter('getSiteConfig') siteConfig!: ISiteConfig;
  @Getter('getAgentChannel') agentChannel!: IAgentChannel;

  isIOSDownloadStatus = false;
  isDownloadPub = false;
  isDownloading = false;
  progessDone = false;
  downloadText = '正在下载...'; // 一键信任
  showModal = false;
  apphref = '';
  deviceInfoEncrypted = '';

  downloadList: DownloadItem[] = [
    {
      text: '去逛逛',
      type: 'visit',
      platform: 'h5',
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
    {
      text: '极速版下载',
      type: 'downloadPWA',
      platform: 'pwa',
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
    if (this.isIOSMobile) {
      return '若无法正常安装，请使用手机自带浏览器打开本页面（苹果浏览器Safari）';
    } else {
      return '若无法正常安装，请使用手机自带浏览器打开本页面（寰宇浏览器、Chrome谷歌浏览器）';
    }
  }

  get isIOSMobile() {
    return isIOS();
  }

  get isAndroidMobile() {
    return isAndroid();
  }

  get hasAPPDownalod() {
    // 渠道碼
    if (this.siteConfig.routerTpl === 'porn1' && localStorage.getItem('code')) {
      return false;
    }

    if (!this.downloadConfig.android.show || !this.downloadConfig.ios.show || !this.downloadConfig.pwa.show) {
      return false;
    }

    return true;
  }

  created() {
    console.log('isMobile:', isMobile());

    if (this.$route.query) {
      initRouterReferralCode(this.$route.query);
    }

    this.getLCFSystemConfig().then(() => {
      if (localStorage.getItem('action') === 'download' || this.$route.query.action === 'download') {
        localStorage.removeItem('action');

        let target: DownloadItem = {
          text: '',
          type: '',
          platform: '',
        };

        if (isSafari()) {
          target = this.downloadList[3];
        } else if (this.isAndroidMobile) {
          target = this.downloadList[2];
        }

        this.handleDownloadClick(target);
      }
    });
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
    // 1. 取得裝置資訊
    this.deviceInfoEncrypted = EncryptInfo(this.siteConfig.domain);

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
        if (result && result === 'agentPWA') {
          this.downloadPubMobile(false);
          return;
        }

        if (result && result.length > 0) {
          // 強制二次下載跳轉描述檔確認頁
          switch (target.platform) {
            case 'pwa': {
              this.downloadPubMobile(false);
              break;
            }
          }

          const a = document.createElement('a');
          a.href = result;
          document.body.appendChild(a);
          a.click();

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
          this.openApp(target);
        }
        break;

      case 'pwa':
        platform = '2';
        getDownloadUri(platform);
        break;

      case 'android':
        platform = '3';
        getDownloadUri(platform);
        this.openApp(target);
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

    // 渠道碼
    if (this.siteConfig.routerTpl === 'porn1' && localStorage.getItem('code')) {
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
    if (this.isDownloading || !this.downloadConfig[target.platform as keyof IDownloadConfig].show) {
      return;
    }

    this.isDownloading = true;
    setTimeout(() => {
      this.isDownloading = false;
    }, 1500);

    this.setAgentDeviceInfo({ data: this.deviceInfoEncrypted }).then(() => {
      this.actionSentAnalysis({ eventType: target.type });

      // 2. 註冊裝置資訊uuid
      if (this.agentChannel && this.agentChannel.uuid) {
        InitInstallInfo(this.agentChannel);
        return;
      }

      switch (target.platform) {
        case 'ios': {
          this.isIOSDownloadStatus = true;

          // 正在下載進度
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
          this.handleDownload(target);
          break;

        case 'h5':
          this.linkTo(target.type);
          break;

        case 'hide':
          this.handleDownload(target);
          break;
      }
    });
  }

  openApp(target: DownloadItem) {
    if (this.siteConfig.routerTpl === 'porn1' || !localStorage.getItem('channelid')) {
      return;
    }

    setTimeout(() => {
      try {
        const schema = {
          android: `${this.siteConfig.andAppSchema}?code=${localStorage.getItem('b')}`,
          ios: `${this.siteConfig.iosAppSchema}open?code=${localStorage.getItem('b')}`,
        };

        localStorage.removeItem('b');
        this.apphref = `${schema[target.platform]}`;

        if (this.apphref) {
          document.getElementById('startApp')?.setAttribute('href', `${this.apphref}`);
          // document.getElementById('startApp')?.setAttribute('onclick', `(function(){ window.location = '${this.apphref}' })()`);
        }

        const now = new Date().valueOf();
        setTimeout(() => {
          if (new Date().valueOf() - now > 100) return;
        }, 500);
        document.getElementById('startApp')?.click();
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }
}
