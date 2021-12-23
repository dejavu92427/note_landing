<template>
  <div class="container">
    <img class="bg" :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/bg.png`)}`" />
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <div class="content">
      <div class="logo-header">
        <img :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/logo.png`)}`" />
      </div>

      <div class="title">网站升级中</div>

      <div class="main-wrap">
        <img :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/pic_maintain.png`)}`" />
      </div>

      <div class="desc" v-if="maintainTime">
        <div>
          目前网站进行维护中，如有不便之处，敬请见谅。
          <br />
          我们很快回来！请您稍后回来继续游戏哦！
        </div>
        <div class="gmt">当地时间(GMT+8:00)</div>
        <div class="time">{{ maintainTime }}</div>
      </div>

      <div class="service">
        如需帮助，请
        <a id="serviceBtn" type="button" @click="linkTo">联系客服</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Getter, Action } from 'vuex-class';
import { ISiteConfig } from '../../lib/interface';
import { store } from '../../store';

@Options({
  beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    (async () => {
      try {
        // 取得廳設定
        await store.dispatch('initSiteInfo');
        next();
      } catch (e) {}
    })();
  },
})
export default class Upup extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('getCommonList') getCommonList!: Function;
  @Action('getHostnames') getHostnames!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;

  @Getter('getSiteConfig') siteConfig!: ISiteConfig;
  @Getter('getCDN') cdnPath!: string;

  maintainTime = '';

  created() {
    this.getPlayer().then((res) => {
      this.getCommonList();
      this.getHostnames();
      if (res && res.status !== '000' && res.data.extra) {
        const text =
          res.data.extra.start_at && res.data.extra.end_at
            ? `${res.data.extra.start_at.substring(0, 16).replace('T', ' ')} ~ ${res.data.extra.end_at.substring(0, 16).replace('T', ' ')}`
            : '';
        this.maintainTime = text;
      }

      if (res && res.data && res.data.status === '000' && this.$route.params.type !== 'test') {
        this.$router.push(`/download${localStorage.getItem('code') ? `/a/${localStorage.getItem('code')}` : ''}`);
      }
    });
  }

  linkTo(): void {
    this.actionLinkTo('clientService');
  }

  getCDNPath(path) {
    return path;
  }
}
</script>
<style lang="scss">
@import '~@/assets/css/mobile/index.scss';
</style>
<style lang="scss" scoped>
@import '~@/assets/css/mobile/status.scss';
</style>
