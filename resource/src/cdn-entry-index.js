/* eslint-disable */
const main = () => import(/* webpackChunkName: 'main' */ './main');

import siteConfigJson from '../src/config/site.config.json';

let cdnHost = '';
let h;
// nignx F5 DC x-cdn header
function getCDNHost() {
  fetch(`/conf/domain`)
    .then(function (response) {
      h = response.headers;
      return response.json();
    })
    .then(function (data) {
      let target = siteConfigJson.find((i) => i.DOMAIN === data.domain);

      if (target && target.CDN_HEADER) {
        cdnHost = h.get(`${target.CDN_HEADER}`);
      }

      const isDev = process.env.NODE_ENV === 'development';
      console.log('header:', target.CDN_HEADER);
      console.log('__webpack_public_path__:', cdnHost);

      window.SITE_NAME = data.site;
      window.SITE_DOMAIN = data.domain;
      window.CDN = '';

      const path = cdnHost ? `https://${cdnHost}/` : '';

      if (!isDev && path) {
        window.CDN = path;
        process.env.cdn = path;
        __webpack_public_path__ = path;
      }
    })
    .catch(function (e) {
      window.location.href = '/404';
    })
    .then(main);
}
getCDNHost();
