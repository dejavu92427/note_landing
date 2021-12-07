<template>
  <div class="container">
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <!-- <div>
      <img class="swiper-slide-img" src="@/assets/img/sports_main.png" />
    </div> -->

    <div class="swiper-wrap">
      <swiper id="swiper" :loop="true" :pagination="{ clickable: true }">
        <template v-if="['porn1'].includes(siteConfig.routerTpl)">
          <swiper-slide v-for="(item, key) in mainImgList" :key="key">
            <div class="swiper-slide-img">
              <!-- <img :src="`${cdnPath}${(item.src)}`" /> -->
              <img :src="`${cdnPath}${require('@/assets/img/porn1/sports_main.png')}`" />
            </div>
          </swiper-slide>
        </template>

        <template v-if="['aobo1'].includes(siteConfig.routerTpl)">
          <swiper-slide>
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/main_01.png')}`" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/main_02.png')}`" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/main_03.png')}`" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/main_04.png')}`" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-slide-img">
              <img :src="`${cdnPath}${require('@/assets/img/aobo1/main_05.png')}`" />
            </div>
          </swiper-slide>
        </template>
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
        <span class="recommend-text">{{ recommendText }}</span>
      </div>
      <div>
        如需帮助，
        <a @click="linkTo('clientService')" class="link" target="_blank">请联系客服</a>
      </div>
    </div>

    <div v-if="['aobo1'].includes(siteConfig.routerTpl)" class="download-tip-extra"></div>
    <div class="version">{{ verison }}</div>

    <modalBox v-show="showModal" @close="toogleModal(false)" />
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ModalBox from '../../common/modalBox.vue';
import DownloadMixin from '../../../lib/mixin/download';

@Options({
  components: {
    swiper: Swiper,
    swiperSlide: SwiperSlide,
    modalBox: ModalBox,
  },
  // mixins: [DownloadMixin],
})
export default class DownloadPorn1 extends mixins(DownloadMixin) {
  // created() {}
  // mounted() {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mobile/index.scss';
@import '~@/assets/css/mobile/download.scss';
</style>
