import { RouteRecordRaw } from 'vue-router';
import { isMobile } from '@/lib/isMobile';

export const Sg1Router: RouteRecordRaw = {
  path: '/',
  component: () => import('../../views/index.vue'),
  children: [
    {
      // home
      path: 'download/:type?',
      alias: '',
      name: 'home',
      component: () => import('../../views/porn1/download/index.vue')
    },
    {
      // pc
      path: 'pc/:type?',
      alias: '',
      name: 'pc',
      beforeEnter: (to, from, next) => {
        if (isMobile()) {
          next('/download');
        } else {
          next('/pc');
        }
      },
      component: () => import('../../views/porn1/pc/index.vue')
    },
    {
      // 註冊
      path: 'register/:tpye?',
      alias: '',
      name: 'register',
      component: () => import('../../views/porn1/register/index.vue')
    }
  ]
};
