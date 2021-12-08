import { Action, Getter } from 'vuex-class';
import { ICommonConfig, IDownloadConfig, ISiteConfig } from '../interface';
import { Options, Vue } from 'vue-class-component';
import Swiper, { SwiperOptions } from 'swiper';
import { isAndroid, isIOS, isMobile, isSafari } from '../isMobile';

import ProgressBar from 'progressbar.js';

interface DownloadItem {
  text: string;
  type: string;
  platform: string;
}

@Options({
  components: {},
})
export default class DownloadMixin extends Vue {
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

  // mainImgList: any[] = [
  //   {
  //     src: require('@/assets/img/porn1/sports_main.png'),
  //   },
  // ];

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
  swiper?: Swiper;
  swiperOpts: SwiperOptions = {
    loop: true,
    pagination: {
      type: 'bullets',
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 'auto',
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

  beforeUnmount() {
    // window.removeEventListener('focus');
  }

  created() {
    console.log('isMobile:', isMobile());
    this.getLCFSystemConfig();
    if (isMobile()) {
      // 是否保留推廣代碼
      // this.$router.push('/download');
    } else {
      this.$router.push('/pc');
    }
  }

  mounted() {
    this.$nextTick(() => {
      const swiperDom: any = document.getElementById('swiper');
      if (swiperDom && swiperDom.swiper) {
        swiperDom.swiper.update();
      }
    });
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
