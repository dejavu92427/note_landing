import { RouteRecordRaw } from 'vue-router';

export const Porn1Router: RouteRecordRaw = {
  path: '/',
  component: () => import('../../views/index.vue'),
  children: [
    {
      path: 'download/:type?',
      name: 'download',
      component: () => import('../../views/porn1/download/index.vue'),
    },
    {
      // pc
      path: 'pc/:code?',
      name: 'pc',
      component: () => import('../../views/porn1/pc/index.vue'),
    },
  ],
};
