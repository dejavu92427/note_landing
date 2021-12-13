import { RouteRecordRaw } from 'vue-router';

export const Sp1Router: RouteRecordRaw = {
  path: '/',
  component: () => import('../../views/index.vue'),
  children: [
    {
      path: 'download',
      name: 'download',
      component: () => import('../../views/sp1/download/index.vue'),
    },
    {
      // pc
      path: 'pc',
      name: 'pc',
      component: () => import('../../views/sp1/pc/index.vue'),
    },
  ],
};
