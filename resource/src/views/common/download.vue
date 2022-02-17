<template>
  <div>
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
          <div class="swiper-wrapper">
            <div v-for="(item, index) in sliderImgs[siteConfig.routerTpl]" class="swiper-slide" :key="index">
              <div class="swiper-slide-img">
                <img :src="`${cdnPath}${item}`" />
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <div v-if="siteConfig.routerTpl == 'aobo1'" class="service-wrap">
        <div @click="linkTo('clientService')" id="service-link">
          <img id="appicon" :src="`${cdnPath}${require('@/assets/img/aobo1/ic_service.png')}`" />
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

      <template v-else>
        <!-- 51 IOS版 -->
        <div v-if="siteConfig.routerTpl === 'sp1' && this.isIOSMobile" :class="`download-wrap ios`">
          <template v-for="item in sp1DownloadList">
            <div v-if="showDownloadItem(item)" :key="`download-btn-${item.type}-sp5`" :class="`download-container`">
              <button :id="item.type" :class="`download-btn ${siteConfig.routerTpl} ios`" @click="handleDownloadClick(item)" :type="item.platform">
                {{ item.text }}
              </button>
            </div>
          </template>
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
      </template>
      <div class="donwload-tip">
        <div>
          需在同一网络环境下载安装，请勿切换网络；
          <span class="recommend-text">{{ recommendText }}</span>
        </div>
        <div v-if="['porn1'].includes(siteConfig.routerTpl)">
          如需帮助，
          <a @click="linkTo('clientService')" class="link" target="_blank">请联系客服</a>
          <div @click.stop="copy" class="donwload-tip porn1 title">
            {{ isAndroidMobile ? '下滑查看Android帮助' : '' }}
            <img v-if="isAndroidMobile" class="donwload-tip-arrow" :src="`${require(`@/assets/img/jiantou.png`)}`" />
          </div>
        </div>
      </div>

      <div v-if="['aobo1', 'sp1'].includes(siteConfig.routerTpl)" class="download-tip-extra">
        <div @click.stop="copy" class="donwload-tip title">
          {{ isAndroidMobile ? '下滑查看安装教程與Android帮助' : '下滑查看安装教程' }}
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

      <a id="startApp" style="position=fixed;opacity=0;pointerEvents=none" href="javascript:void(0)"></a>
      <modalBox v-show="showModal" @close="toogleModal(false)" />
    </div>
    <div v-if="isAndroidMobile" class="android-container">
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
              :class="[item.name, { active: currentButton == item.name }]"
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
import ModalBox from './modalBox.vue';
import { mixins, Options } from 'vue-class-component';
import DownloadMixin from '../../lib/mixin/download';
import { InitClipboardInfo } from '../../lib/install';

@Options({
  components: {
    modalBox: ModalBox,
  },
  // mixins: [DownloadMixin],
})
export default class DownloadCommon extends mixins(DownloadMixin) {
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
      name: 'oppo',
    },
    {
      name: 'vivo',
    },
    {
      name: 'huawei',
    },
  ];
  copy() {
    InitClipboardInfo(this.agentChannel, this.siteConfig.routerTpl);
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
</style>
<style lang="scss" scoped>
@import '~@/assets/css/mobile/download.scss';
</style>
