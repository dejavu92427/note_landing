import { RouteRecordRaw } from 'vue-router';

export const Aobo1Router: RouteRecordRaw = {
  path: '/',
  component: () => import('../../views/index.vue'),
  children: [
    {
      path: 'download',
      name: 'download',
      component: () => import(`../../views/aobo1/download/index.vue`),
    },
    {
      // pc
      path: 'pc',
      name: 'pc',
      component: () => import('../../views/aobo1/pc/index.vue'),
    },
  ],
};
