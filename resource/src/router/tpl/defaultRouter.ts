import { RouteRecordRaw } from 'vue-router';

export const DefaultRouter: RouteRecordRaw = {
  path: '/',
  component: () => import('../../views/index.vue'),
  children: [
    {
      path: '*',
      name: 'download',
      redirect: '404',
    },
  ],
};
