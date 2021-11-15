/* eslint-disable */
import './registerServiceWorker';
import 'swiper/swiper-bundle.css';

import App from './App.vue';
import { Vue } from 'vue-class-component';
import { createApp } from 'vue';
import router from './router';
import { store } from './store';

// Register the router hooks with their names
// Component.registerHooks
Vue.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

// declare module 'Vue' {
//   interface Vue {
//     $getCDNPath: any;
//   }
// }
// Vue.prototype.$getCDNPath = function() {};

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');

// 換頁前，顯示loading圖
// router.beforeEach((to, from, next) => {
//     document.getElementById('main-loading').style.display = 'block';
//     next();
// });

router.afterEach(() => {
  // let loadingWrap = document.getElementById("main-loading");
  // if (loadingWrap) {
  //   loadingWrap.style.display = "none";
  // }
});

declare global {
  interface Window {
    SITE_NAME: any;
    SITE_DOMAIN: any;
    CDN: string;
  }
}
