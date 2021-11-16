<template>
  <div class="container">
    <img class="bg" src="@/assets/img/porn1/bg.png" />
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <div class="content">
      <div class="logo-header">
        <img src="@/assets/img/porn1/logo.png" />
      </div>

      <div class="main-wrap">
        <img src="@/assets/img/porn1/pic_maintain.png" />
      </div>

      <div class="desc">
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
        await store.dispatch('getPlayer').then(response => {
          if (response && response.data.status !== '000') {
            switch (response.data.code) {
              case 'M00002':
                next();
                return;
              default:
                // upup/test 測試模式
                if (to.name === 'upup' && to.params.type && to.params.type === 'test') {
                  next();
                  return;
                }
                next();
                break;
            }
          } else {
            next('/download');
          }
        });
      } catch (e) {
        next();
      }
    })();
  }
})
export default class HomePorn1 extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Action('actionLinkTo') actionLinkTo!: Function;

  @Getter('getSiteConfig') siteConfig!: ISiteConfig;

  maintainTime = '00:00 - 00:00';

  created() {
    console.log('upup ', this.siteConfig);
    if (this.$route.params && this.$route.params.type !== 'test') {
      // this.getPlayer().then(response => {
      //   console.log(response);
      // });
    }
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
.container {
  position: relative;
  background-color: #fff;
  min-height: 100vh;
  overflow-x: hidden;

  > .bg {
    width: 100%;
    height: 100vh;
    top: 0;
  }
}

.content {
  height: 100%;
  padding-top: 25px;
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
    height: 60px;
  }
}

.main-wrap {
  width: 100%;
  height: 360px;
  text-align: center;
  > img {
    height: 100%;
  }
}

.desc {
  color: #9ca3bf;
  font-family: Microsoft JhengHei, Microsoft JhengHei-Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 19px;
  margin: 28px auto;
  text-align: center;
  width: 100%;

  .time {
    color: #f70;
    white-space: nowrap;
  }
}

.service {
  bottom: 10%;
  color: #a6a9b2;
  font-family: Microsoft JhengHei, Microsoft JhengHei-Regular;
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  text-align: center;
  width: 100%;

  #serviceBtn {
    color: #6aaaf5;
  }
}
</style>
