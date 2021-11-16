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
        // 取得廳設定
        await store.dispatch('initSiteInfo');

        await store.dispatch('getPlayer').then(response => {
          if (response && response.data.status !== '000') {
            switch (response.data.code) {
              case 'M00002':
                next('/upup');
                return;
              default:
                break;
            }
          } else {
            next();
          }
        });
      } catch (e) {
        console.log(e);
        next('/upup');
      }
    })();
  }
})
export default class RootMobile extends Vue {
  created() {}
}
</script>
<style lang="scss">
@import url('../assets/css/mobile/index.scss');
</style>
