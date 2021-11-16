import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Home from '../views/index.vue';
import { Porn1Router } from './tpl/porn1Router';
import { Sg1Router } from './tpl/sg1Router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (to.query && to.query.code) {
        const code = to.query.code.toString();
        localStorage.setItem('code', code);
      }

      if (to.query && to.query.a) {
        const code = to.query.a.toString();
        localStorage.setItem('code', code);
      }

      next('/download');
    },
    children: [
      {
        path: '/a/:code',
        name: 'Code',
        redirect: to => ({
          name: 'Home',
          query: { code: to.params.code }
        })
      },

      { path: '403error', name: '403error', redirect: '/403' },
      { path: '403error.html', name: '403error.html', redirect: '/403' },
      { path: '403', name: '403', component: () => import('@/views/common/403.vue') },

      { path: 'maintain', name: 'maintain', redirect: '/upup' },
      { path: 'maintain.html', name: 'maintain.html', redirect: '/upup' },
      { path: 'upup/:type?', name: 'upup', component: () => import('@/views/common/upup.vue') }
    ]
  }

  // {
  //   path: '/404',
  //   name: '404',
  //   redirect: '/'
  // }
];

const site = window.SITE_NAME;
const router = createRouter({
  history: createWebHistory(),
  routes
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
