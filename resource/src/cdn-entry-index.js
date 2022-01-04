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
      // let target = siteConfigJson.find((i) => i.DOMAIN === data.domain);

      // if (data && data.cdn) {
      //   cdnHost = data.cdn;
      // }

      const isDev = process.env.NODE_ENV === 'development';
      window.SITE_NAME = data.site;
      window.SITE_DOMAIN = data.domain;

      const path = cdnHost ? `https://${cdnHost}/` : '';
      if (!isDev && path) {
        console.log(path);
        process.env.cdn = path;

        // resource cdn
        //  __webpack_public_path__ = path;
        // console.log('__webpack_public_path__:', cdnHost);
      }
    })
    .catch((e) => {
      console.log(e);
    })
    .then(main);
}
getCDNHost();
