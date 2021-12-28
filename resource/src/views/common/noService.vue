<template>
  <div class="container">
    <img class="bg" :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/bg.png`)}`" />
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <div class="content">
      <div class="logo-header">
        <img :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/logo_b.png`)}`" />
      </div>

      <div class="title">访问受限制</div>
      <div class="extraMsg">{{ extraMsg }}</div>

      <div class="main-wrap">
        <img :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/pic_403.png`)}`" />
      </div>

      <div class="desc">
        <div>
          尊敬的用户，由于相关法规限制，您所在的地区无法使用
          <br />
          币发BIFA产品，如有任何疑问，请通过在线客服，或发邮件至
          <p class="mail" onclick="location.href='mailto:cs@bifa8.co';">cs@bifa8.co</p>
          我们将第一时间给您回复，对您造成的不便，我们深表歉
          <br />
          意，感谢您的理解与支持！
        </div>
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
      } catch (e) {
        console.log(e);
      }
    })();
  },
})
export default class NoService extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('getCommonList') getCommonList!: Function;
  @Action('getClientDomain') getClientDomain!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;
  // @Action('getHostnames') getHostnames!: Function;

  @Getter('getSiteConfig') siteConfig!: ISiteConfig;
  @Getter('getCDN') cdnPath!: string;

  extraMsg = '';
  created() {
    this.getPlayer().then((res) => {
      this.getCommonList();
      this.getClientDomain();

      if (res && res.status !== '000' && res.data.extra) {
        // msg: "您所在的区域不在我们服务允许范围内(x.x.x.x)"
        this.extraMsg = res.data.msg;
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
