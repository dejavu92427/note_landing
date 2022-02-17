export function initRouterReferralCode(query: any) {
  localStorage.removeItem('code');
  localStorage.removeItem('channelid');

  if (query.code && query.code !== 'undefined') {
    localStorage.setItem('code', query.code.toString());
  }

  if (query.a && query.a !== 'undefined') {
    localStorage.setItem('code', query.a.toString());
  }

  if (query.channelid && query.channelid !== 'undefined') {
    localStorage.setItem('channelid', query.channelid.toString());
  }

  if (query.action && query.action) {
    localStorage.setItem('action', query.action.toString());
  }
}
