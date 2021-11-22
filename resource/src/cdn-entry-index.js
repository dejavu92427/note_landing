/* eslint-disable */
const main = () => import(/* webpackChunkName: 'main' */ './main');
let cdnHost = '';
let h;
// nignx F5 DC x-cdn header
function getCDNHost() {
  fetch(`/conf/domain`)
    .then(function(response) {
      h = response.headers;
      return response.json();
    })
    .then(function(data) {
      if (data.cdn) {
        cdnHost = h.get(`${data.cdn}`);
      }

      const isDev = process.env.NODE_ENV === 'development';
      console.log('__webpack_public_path__:', cdnHost);

      window.SITE_NAME = data.site;
      window.SITE_DOMAIN = data.domain;
      window.CDN = '';

      const path = cdnHost ? `https://${cdnHost}/` : '';

      if (!isDev) {
        window.CDN = path;
        process.env.cdn = path;
        __webpack_public_path__ = path;
      }
    })
    .catch(function(e) {
      console.log(e);
    })
    .then(main);
}
getCDNHost();
