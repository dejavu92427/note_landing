import { RouteLocationNormalized } from 'vue-router';

export function initRouterReferralCode(to: RouteLocationNormalized) {
  localStorage.removeItem('code');

  if (to.query && to.query.code) {
    const code = to.query.code.toString();
    localStorage.setItem('code', code);
  }

  if (to.query && to.query.a) {
    const code = to.query.a.toString();
    localStorage.setItem('code', code);
  }

  if (to.query && to.query.channelid) {
    const channelId = to.query.channelid.toString();
    localStorage.setItem('channelId', channelId);
  }
}
