<template>
  <div class="container" v-if="isInit">
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
          {{ siteConfig.siteName }}产品，如有任何疑问，请通过在线客服，或发邮件至
          <template v-if="getServiceMail && getServiceMail.length == 2">
            <p class="mail red" :onclick="`location.href='mailto:${getServiceMail[0]}`">paopao 客服邮箱&nbsp;{{ getServiceMail[0] }}</p>
            <p class="mail red" :onclick="`location.href='mailto:${getServiceMail[1]}`">paopao 主播邮箱&nbsp;{{ getServiceMail[1] }}</p>
          </template>
          <template v-else>
            <p class="mail" :onclick="`location.href='mailto:${getServiceMail}`">{{ getServiceMail }}</p>
          </template>
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
import { Getter, Action } from 'vuex-class';
import { ISiteConfig } from '../../lib/interface';

@Options({})
export default class NoService extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('getCommonList') getCommonList!: Function;
  @Action('getClientDomain') getClientDomain!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;
  @Action('initSiteInfo') initSiteInfo!: Function;

  @Getter('getSiteConfig') siteConfig!: ISiteConfig;
  @Getter('getCDN') cdnPath!: string;

  get getServiceMail(): string[] {
    switch (this.siteConfig.routerTpl) {
      case 'porn1':
        return ['cs@bifa8.co'];
      case 'aobo1':
        return ['asd1523642@gmail.com'];
      case 'sg1':
        return ['cs@paocs.co', 'cs2@paocs.co'];
      case 'sp1':
        return ['senghout5151@gmail.com'];

      default:
        return [''];
    }
  }

  extraMsg = '';
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
            // msg: "您所在的区域不在我们服务允许范围内(x.x.x.x)"
            this.extraMsg = res.data.msg;
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
