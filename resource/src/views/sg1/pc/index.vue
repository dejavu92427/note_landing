<template>
  <div class="wrap" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/bg_pc.png')})` }">
    <div class="layout-center">
      <div class="layout-title">
        <div class="title-1 pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/title_01.png')})` }"></div>
        <div class="title-2 pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/title_02.png')})` }"></div>
      </div>
      <div class="layout-text">
        <div class="logo pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/logo_cover.png')})` }"></div>
        <div class="title pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/title_03.png')})` }"></div>
      </div>
      <div class="layout-mobile">
        <div class="phone-1 pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/phone_img01.png')})` }"></div>
        <div class="phone-2 pic" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/phone_img02.png')})` }">
          <qrcode-vue id="qrcode" :value="qrcodeOpt.value" :size="qrcodeOpt.size"></qrcode-vue>
        </div>
        <div class="shadow-1 pic-t" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/phone_shadow01.png')})` }"></div>
        <div class="shadow-2 pic-t" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/phone_shadow02.png')})` }"></div>
      </div>
    </div>
    <div class="layout-player">
      <div class="cover pic-t" :style="{ 'background-image': `url(${cdnPath}${require('@/assets/img/porn1/player.png')})` }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Getter } from 'vuex-class';
import { isMobile } from '../../../lib/isMobile';
import qrcodeVue from 'qrcode.vue';

@Options({
  components: {
    qrcodeVue,
  },
})
export default class PcSg1 extends Vue {
  @Getter('getCDN') cdnPath!: string;

  // get getCDNPath() {
  //   return `${this.cdn}`;
  // }

  qrcodeOpt = {
    value: '',
    size: 170,
  };

  created() {
    if (isMobile()) {
      this.$router.push('/download');
      return;
    }
    // let qrUrl = `${window.location.host}${this.$route.query.a ? `/a/${this.$route.query.a}/` : ''}`;
    const qrUrl = `${window.location.host}${localStorage.getItem('code') ? `/a/${localStorage.getItem('code')}/` : ''}`;
    this.qrcodeOpt.value = qrUrl;
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/mobile/pc.scss';
</style>
