<template>
  <div class="container" v-if="isInit">
    <img class="bg" :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/bg.png`)}`" />
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <div class="content">
      <div class="logo-header">
        <img :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/logo_b.png`)}`" />
      </div>

      <div class="title">网站升级中</div>

      <div class="main-wrap">
        <img :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/pic_maintain.png`)}`" />
      </div>

      <div class="desc">
        <div>
          目前网站进行维护中，如有不便之处，敬请见谅。
          <br />
          我们很快回来！请您稍后回来继续游戏哦！
        </div>
        <template v-if="maintainTime">
          <div class="gmt">当地时间(GMT+8:00)</div>
          <div class="time">{{ maintainTime }}</div>
        </template>
      </div>

      <div class="service">
        如需帮助，请
        <a id="serviceBtn" @click="linkTo">联系客服</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Getter, Action } from 'vuex-class';
import { ISiteConfig } from '../../lib/interface';

@Options({})
export default class Upup extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('getCommonList') getCommonList!: Function;
  @Action('getClientDomain') getClientDomain!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;
  @Action('initSiteInfo') initSiteInfo!: Function;

  // @Action('getHostnames') getHostnames!: Function;

  @Getter('getSiteConfig') siteConfig!: ISiteConfig;
  @Getter('getCDN') cdnPath!: string;

  maintainTime = '';
  isInit = false;

  created() {
    (async () => {
      try {
        // 取得廳設定
        await this.initSiteInfo();
        this.getClientDomain();

        this.getPlayer().then((res) => {
          this.getCommonList();

          this.isInit = true;

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
      } catch (e) {
        console.log(e);
      }
    })();
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
