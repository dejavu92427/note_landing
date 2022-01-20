<template>
  <router-view />
</template>

<script lang="ts">
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { store } from '../store';
import { Options, Vue } from 'vue-class-component';
import { isMobile } from '../lib/isMobile';

@Options({
  beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    (async () => {
      try {
        // 取得廳設定
        await store.dispatch('initSiteInfo');
        await store.dispatch('getClientDomain');
        await store.dispatch('getPlayer').then((response) => {
          store.dispatch('getCommonList');

          if (response && response.data.status !== '000') {
            switch (response.data.code) {
              case 'M00002':
                if (to.path === '/upup') {
                  next();
                  return;
                }
                next('/upup');
                return;

              case 'M00003':
              case 'M00004':
                if (to.path === '/no_service') {
                  next();
                  return;
                }
                next('/no_service');
                return;

              default:
                break;
            }
          } else {
            if (to.name === 'download' || to.name === 'pc') {
              next();
            } else {
              if (isMobile()) {
                next({
                  name: 'download',
                  query: { code: to.query.code, action: to.query.action, channelid: to.query.channelid },
                });
              } else {
                next('pc');
              }
            }
          }
        });
      } catch (e) {
        console.log(e);
        next('upup');
      }
    })();
  },
})
export default class RootMobile extends Vue {}
</script>
<style lang="scss"></style>
