import { RouteRecordRaw } from 'vue-router';

export const Porn1Router: RouteRecordRaw = {
  path: '/',
  component: () => import('../../views/index.vue'),
  children: [
    {
      path: 'download/:type?',
      alias: '',
      name: 'download',
      component: () => import('../../views/porn1/download/index.vue')
    },
    {
      // pc
      path: 'pc/:type?',
      alias: '',
      name: 'pc',
      // beforeEnter: (to, from, next) => {
      //   if (isMobile()) {
      //     next('/download');
      //   } else {
      //     next('/pc');
      //   }
      // },
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
