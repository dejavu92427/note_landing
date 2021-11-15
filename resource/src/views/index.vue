<template>
  <router-view />
</template>

<script lang="ts">
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { store } from '../store';
import { Options, Vue } from 'vue-class-component';

@Options({
  beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    (async () => {
      try {
        // 取得webserver該廳設定
        await store.dispatch('initSiteInfo');

        // 取得廳設定
        store.dispatch('getCommonList');
        store.dispatch('getHostnames');

        // 取得下載設定
        // store.d ispatch('getLCFSystemConfig');

        await store.dispatch('getPlayer').then(response => {
          // 取得廳設定
          if (response && response.data) {
            switch (response.data.code) {
              case 'M00001':
                return;
              default:
                next('/upup');
                return;
            }
          }
        });
        next();
      } catch (e) {
        console.log(e);
        next('/upup');
      }
    })();
  }
})
export default class RootMobile extends Vue {}
</script>
<style lang="scss">
@import url('../assets/css/mobile/index.scss');
</style>
