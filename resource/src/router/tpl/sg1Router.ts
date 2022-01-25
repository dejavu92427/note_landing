import { RouteRecordRaw } from 'vue-router';

export const Sg1Router: RouteRecordRaw = {
  path: '/',
  component: () => import('../../views/index.vue'),
  children: [
    {
      path: 'download',
      name: 'download',
      component: () => import('../../views/sg1/download/index.vue'),
    },
    {
      // pc
      path: 'pc',
      name: 'pc',
      component: () => import('../../views/sg1/pc/index.vue'),
    },
  ],
};
