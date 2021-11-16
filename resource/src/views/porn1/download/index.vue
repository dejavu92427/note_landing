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
            <img src="@/assets/img/porn1/sports_main.png" />
            <!-- <img src="@/assets/static/image/porn1/common/logo.png" /> -->
            <!-- https://ya.jingliangjiu.cn/static/image/porn1/common/logo.png?v=36612412.1 -->
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="download-wrap">
      <template v-for="item in downloadList">
        <div v-if="showDownloadItem(item)" :key="`download-btn-${item.type}`" class="download-container">
          <button :id="item.type" class="download-btn" @click="handleClick(item)">
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
  </div>
</template>

<script lang="ts">
import { Getter, Action } from 'vuex-class';
import { IDownloadConfig, ISiteConfig } from '../../../lib/interface';
import { Options, Vue } from 'vue-class-component';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { SwiperOptions } from 'swiper';
import { ICommonConfig } from '../../../lib/interface';
import { isMobile } from '../../../lib/isMobile';

interface DownloadItem {
  show: boolean;
  text: string;
  type: string;
  platform: string;
  ga: string;
}

@Options({
  components: {
    swiper: Swiper,
    swiperSlide: SwiperSlide
  }
})
export default class HomePorn1 extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('getLCFSystemConfig') getLCFSystemConfig!: Function;
  @Action('getDownloadUri') getDownloadUri!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;

  @Getter('getDonwloadConfig') downloadConfig!: IDownloadConfig;
  @Getter('getSiteConfig') siteConfig!: ISiteConfig;
  @Getter('getCommonList') commonList!: ICommonConfig;
  @Getter('getHostnames') hostnames!: string[];

  downloadList: DownloadItem[] = [
    {
      show: false,
      text: '去逛逛',
      type: 'visit',
      platform: 'h5',
      ga: ''
    },
    {
      show: false,
      text: '极速版下载',
      type: 'downloadPWA',
      platform: 'pwa',
      ga: ''
    },
    {
      show: false,
      text: 'IOS版下载',
      type: 'downloadIOS',
      platform: 'ios',
      ga: ''
    },
    {
      show: false,
      text: 'ANDROID版下载',
      type: 'downloadANDROID',
      platform: 'android',
      ga: ''
    }
    // {
    //   show: false,
    //   text: '隐藏版下载',
    //   type: '',
    //   platform:'',
    //   ga: ''
    // }
  ];
  swiper: any = {};
  swiperOpts: SwiperOptions = {
    loop: true
  };
  isDownloading = false;

  created() {
    console.log('isMobile:', isMobile());

    if (isMobile()) {
      this.$router.push('/download');
    } else {
      this.$router.push('/pc');
    }
  }

  mounted() {
    // 下載顯示開關
    this.getLCFSystemConfig();
    // this.swiper = new Swiper('#swiper-container', {
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   pagination: {
    //     el: '.swiper-pagination'
    //   }
    // });
  }

  showDownloadItem(target: DownloadItem): boolean {
    if (target.type === 'visit') {
      return true;
    } else {
      return this.downloadConfig[target.platform as keyof IDownloadConfig].show;
    }
  }

  handleClick(target: DownloadItem) {
    switch (target.platform) {
      case 'ios':
      case 'android':
      case 'pwa':
      case 'hide':
        this.handleDownload(target);
        return;
      case 'h5':
        this.linkTo(target.type);
        return;
    }
  }

  handleDownload(target: DownloadItem): void {
    console.log(this.downloadConfig);
    const bundleID = this.downloadConfig[target.platform as keyof IDownloadConfig].bundleID;
    let platform = '';
    switch (target.platform) {
      case 'ios':
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
      platform: platform
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
    document.body.removeChild(a);

    // 強制二次下載跳轉描述檔確認頁
    switch (platform) {
      case 'ios':
      case 'pwa': {
        const focusHandler = () => {
          if (this.isDownloading) return;
          this.isDownloading = true;
          window.location.href = './pub.mobileprovision';
        };

        window.addEventListener('focus', focusHandler);
        return;
      }
    }
  }
}
</script>

<style lang="scss">
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
</style>
