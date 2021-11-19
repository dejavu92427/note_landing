<template>
  <div class="wrap" :style="{ 'background-image': `url(${require('@/assets/img/porn1/bg_pc.png')})` }">
    <div class="layout-center">
      <div class="layout-title">
        <div class="title-1" :style="{ 'background-image': `url(${require('@/assets/img/porn1/title_01.png')})` }"></div>
        <div class="title-2" :style="{ 'background-image': `url(${require('@/assets/img/porn1/title_02.png')})` }"></div>
      </div>
      <div class="layout-text">
        <h2 class="logo pic-t" style='background-image: url("static/images/logo_cover.png");'></h2>
        <h2 class="title pic-t" style='background-image: url("static/images/title_03.png");'></h2>
      </div>
      <div class="layout-mobile">
        <div class="phone-1 pic-t" style='background-image: url("static/images/phone_img01.png");'></div>
        <div class="phone-2 pic-t" style='background-image: url("static/images/phone_img02.png");'>
          <div class="offical_code" id="offical_qrcode"><canvas width="170" height="170"></canvas></div>
        </div>
        <div class="shadow-1 pic-t" style='background-image: url("static/images/phone_shadow01.png");'></div>
        <div class="shadow-2 pic-t" style='background-image: url("static/images/phone_shadow02.png");'></div>
      </div>
    </div>
    <div class="layout-player">
      <div class="cover pic-t" style='background-image: url("static/images/player.png");'></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { isMobile } from '../../../lib/isMobile';

export default class PcPorn1 extends Vue {
  created() {
    // if (isMobile()) {
    //   this.$router.push('/download');
    // } else {
    //   this.$router.push('/pc');
    // }
  }
}
</script>
<style lang="scss">
.wrap {
  position: relative;
  height: 100vh;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.layout-center {
  position: absolute;
}

.layout-title {
  position: absolute;
  top: 188px;
  left: 11px;
  z-index: 10;
  display: block;

  > div {
    position: absolute;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  .title-1 {
    top: 0;
    left: 128px;
    width: 537px;
    height: 104px;
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
  }

  .title-2 {
    top: 92px;
    left: 0;
    width: 378px;
    height: 89px;
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
  }
}
</style>
