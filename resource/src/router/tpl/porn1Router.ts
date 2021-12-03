import { RouteRecordRaw } from 'vue-router';
import { initRouterReferralCode } from '@/lib/referralCode';

export const Porn1Router: RouteRecordRaw = {
  path: '/',
  component: () => import('../../views/index.vue'),
  children: [
    {
      path: 'download/:type?',
      name: 'download',
      component: () => import('../../views/porn1/download/index.vue'),
      beforeEnter: (to, from, next) => {
        initRouterReferralCode(to);
        next();
      },
    },
    {
      // pc
      path: 'pc/:code?',
      name: 'pc',
      beforeEnter: (to, from, next) => {
        initRouterReferralCode(to);
        next();
      },
      component: () => import('../../views/porn1/pc/index.vue'),
    },
  ],
};
