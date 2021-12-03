import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Home from '../views/index.vue';
import { Porn1Router } from './tpl/porn1Router';
import { Sg1Router } from './tpl/sg1Router';
import error403 from '../views/common/403.vue';
import error404 from '../views/common/404.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (to.name === 'Home') {
        next({
          name: 'download',
          query: to.query,
        });
      } else {
        next();
      }
    },
    children: [
      {
        path: '/a/:code',
        name: 'Code',
        redirect: (to) => ({
          name: 'Home',
          query: { code: to.params.code },
        }),
      },

      { path: '403error', name: '403error', redirect: 'no_service' },
      { path: '403error.html', name: '403error.html', redirect: 'no_service' },
      { path: '403', name: '403', redirect: 'no_service' },
      {
        path: '/no_service/:type?',
        name: '403',
        component: error403,
        // component: () => import('@/views/common/403.vue')
        // { path: '403', name: '403', },
      },

      { path: 'maintain', name: 'maintain', redirect: 'upup' },
      { path: 'maintain.html', name: 'maintain.html', redirect: 'upup' },
      { path: 'upup/:type?', name: 'upup', component: () => import('@/views/common/upup.vue') },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: error404,
  },
];

const site = window.SITE_NAME;
const router = createRouter({
  history: createWebHistory(),
  routes,
});

switch (site) {
  case 'porn1':
    router.addRoute(Porn1Router);
    break;
  case 'sg1':
    router.addRoute(Sg1Router);
    break;

  default:
    router.addRoute(Porn1Router);
    break;
}

export default router;
