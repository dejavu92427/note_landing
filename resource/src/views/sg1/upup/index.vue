<template>
  <div class="container" v-if="isInit">
    <img class="bg" :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/maintainbg.png`)}`" />
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <div class="content">
      <div class="logo-header">
        <img :src="`${cdnPath}${require(`@/assets/img/${siteConfig.routerTpl}/logo_w.png`)}`" />
      </div>

      <div class="title">网站升级中</div>
      <div class="sub-title"><div>PAOPAO直播 24小時大尺度開播</div></div>

      <div class="desc" :style="maintainTime ? { bottom: '10%' } : {}">
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
import { ISiteConfig } from '../../../lib/interface';

@Options({})
export default class Upup extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('getCommonList') getCommonList!: Function;
  @Action('getClientDomain') getClientDomain!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;
  @Action('initSiteInfo') initSiteInfo!: Function;

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
.container {
  position: relative;
  min-height: 100vh;

  > .bg {
    width: 100%;
    min-height: 100vh;
    top: 0;
  }
}

.content {
  height: 100%;
  padding-top: 60px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}

.logo-header {
  width: 100%;
  height: 60px;
  text-align: center;

  > img {
    height: 55px;
    width: 150px;
  }
}

.title {
  color: #fdbe2d;
  font-size: 30px;
  font-weight: 700;
  margin-top: 12px;
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 25%;
}

.sub-title {
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 20%;

  > div {
    border-radius: 23px;
    padding: 5px 12px;
    color: #000;
    background: #fff;
    margin: 0 auto;
    width: 270px;
    margin-top: 8px;
  }
}

.desc {
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 13%;

  .time {
    color: #db6372;
    white-space: nowrap;
  }
}

.service {
  bottom: 8%;
  color: #a6a9b2;
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  text-align: center;
  width: 100%;

  #serviceBtn {
    color: #6aaaf5;
    background-color: unset;
    border: unset;
    outline: none;
  }
}

.extraMsg {
  width: 80%;
  line-height: 19px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #9ca3bf;
  margin: 14px auto 0 auto;
}
</style>
