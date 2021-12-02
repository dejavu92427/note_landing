import { RouteRecordRaw } from 'vue-router';
import { initRouterReferralCode } from '@/lib/referralCode';

export const Porn1Router: RouteRecordRaw = {
  path: '/',
  component: () => import('../../views/index.vue'),
  children: [
    {
      path: 'download/:type?',
      alias: '',
      name: 'download',
      component: () => import('../../views/porn1/download/index.vue'),
      beforeEnter: (to, from, next) => {
        initRouterReferralCode(to);
        // next({ query: to.query });
        next();
      },
    },
    {
      // pc
      path: 'pc/:code?',
      alias: '',
      name: 'pc',
      beforeEnter: (to, from, next) => {
        localStorage.setItem('code', '');

        if (to.query && to.query.code) {
          const code = to.query.code.toString();
          localStorage.setItem('code', code);
        }

        if (to.query && to.query.a) {
          const code = to.query.a.toString();
          localStorage.setItem('code', code);
        }

        next();
      },
      component: () => import('../../views/porn1/pc/index.vue'),
    },
  ],
};
