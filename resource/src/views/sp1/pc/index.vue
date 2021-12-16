<template>
  <div class="wrap">
    <img class="logo-corner" :src="`${cdnPath}${require('@/assets/img/sp1/logo_corner.png')}`" />
    <div class="main-header">
      <qrcode-vue id="qrcode" :value="qrcodeOpt.value" :size="qrcodeOpt.size"></qrcode-vue>
      <img class="code-tips" :src="`${cdnPath}${require('@/assets/img/sp1/code_tip.png')}`" />
    </div>
    <div class="cover-image">
      <img :src="`${cdnPath}${require('@/assets/img/sp1/appdown_sports.png')}`" />
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
export default class PcAobo1 extends Vue {
  @Getter('getCDN') cdnPath!: string;

  // get getCDNPath() {
  //   return `${this.cdn}`;
  // }

  qrcodeOpt = {
    value: '',
    size: 152,
  };

  created() {
    if (isMobile()) {
      this.$router.push('/download');
      return;
    }

    this.qrcodeOpt.value = `${localStorage.getItem('referral-link')}`;
  }
}
</script>
<style lang="scss">
body {
  max-width: unset;
  min-width: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  border: none;
  margin: 0 auto !important;
}

.wrap {
  display: table-cell;
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.logo-corner {
  position: fixed;
  top: 0;
  left: 0;
  width: 145px;
  height: 145px;
  margin: 0 auto;
}

.main-header {
  margin-top: 18px;
}

.code-tips {
  width: 198px;
  height: 175px;
  margin-left: 22px;
}

.cover-image {
  height: 86vh;
  width: 90vw;
  margin: 0 auto;
  margin-top: 45px;

  > img {
    width: 100%;
    // height: 100%;
  }
}
</style>
