import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { Aobo1Router } from './tpl/aobo1Router';
import { DefaultRouter } from './tpl/defaultRouter';
import Home from '../views/index.vue';
import { Porn1Router } from './tpl/porn1Router';
import { Sg1Router } from './tpl/sg1Router';
import { Sp1Router } from './tpl/sp1Router';
import error404 from '../views/common/404.vue';
import { initRouterReferralCode } from '@/lib/referralCode';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      initRouterReferralCode(to);
      next();

      // if (to.name === 'Home') {
      //   next({
      //     name: 'download',
      //     query: to.query,
      //   });
      // } else {
      //   next();
      // }
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
    ],
  },

  { path: '/403error', name: '403error', redirect: 'no_service' },
  { path: '/403error.html', name: '403error.html', redirect: 'no_service' },
  { path: '/403', name: '403', redirect: 'no_service' },
  {
    path: '/no_service/:type?',
    name: 'no_service',
    component: () => import(`@/views/${window.SITE_NAME}/noService/index.vue`),
    // component: () => import('@/views/common/403.vue')
    // { path: '403', name: '403', },
  },

  { path: '/maintain', name: 'maintain', redirect: 'upup' },
  { path: '/maintain.html', name: 'maintain.html', redirect: 'upup' },
  {
    path: '/upup/:type?',
    name: 'upup',
    component: () => import(`@/views/${window.SITE_NAME}/upup/index.vue`),
  },

  {
    // path: '/:pathMatch(.*)*',
    path: '/404',
    name: '404',
    component: error404,
  },
  {
    // path: '/:pathMatch(.*)*',
    path: '/img/:pathMatch(.*)*',
    name: 'imgNotFound',
    component: error404,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'default',
    redirect: 'download',
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
  case 'aobo1':
    router.addRoute(Aobo1Router);
    break;
  case 'sp1':
    router.addRoute(Sp1Router);
    break;
  default:
    router.addRoute(DefaultRouter);
    break;
}

export default router;
