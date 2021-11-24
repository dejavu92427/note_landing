import { IDownloadConfig, ISiteConfig } from '@/lib/interface';

import { State } from './state';
import { Types } from './mutations_type';
import axios from 'axios';
import sitConfigJson from '../config/site.config.json';

/* eslint-disable */
export const actions = {
  // 網站初始化
  // /conf/domain nginx proxy
  initSiteInfo({ commit, dispatch }: { commit: Function; dispatch: Function }): any {
    return axios
      .get('/conf/domain')
      .then(res => {
        if (res && res.data && res.status === 200) {
          const result: ISiteConfig = res.data;
          const targetSite = sitConfigJson.find(i => i.DOMAIN === result.domain);

          if (targetSite) {
            commit(Types.SET_CDN, window.CDN);
            commit(Types.SET_SITE_CONFIG, targetSite);

            document.title = targetSite.SITE_NAME;
            let link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
            link.href = '/img/porn1/favicon.ico';

            // 取得廳設定
            dispatch('getCommonList');
            dispatch('getHostnames');

            // gtag
            if (process.env.NODE_ENV === 'production' && targetSite.PROD) {
              const gtm = document.createElement('script');
              gtm.setAttribute('async', 'true');
              gtm.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=UA-132265281-13`);
              document.body.append(gtm);
            }
          }

          return;
        } else {
          // 測試預設鴨博
          if (process.env.NODE_ENV === 'development') {
            commit(Types.SET_SITE_CONFIG, sitConfigJson[0]);
          }
          return;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  getPlayer({ state, commit }: { state: State; commit: Function }): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/xbb/Player`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h'
        },
        params: {
          lang: 'zh-cn'
        }
      })
      .then(res => {
        const result = res.data.data;
        commit(Types.SET_MEM_INFO, result);
        return res;
      })
      .catch(err => {
        const response = err && err.response;
        return response;
      });
  },

  getHostnames({ state, commit }: { state: State; commit: Function }): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/xbb/Domain/Hostnames/V2`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h'
        },
        params: {
          lang: 'zh-cn',
          clientType: 0,
          withLevelHostname: true
        }
      })
      .then(res => {
        if (res && res.data && res.data.data && res.data.status === '000') {
          const result = res.data.data;
          commit(Types.SET_HOSTNAME, result);
        }
      })
      .catch(err => {
        const response = err && err.response;
        return response;
      });
  },

  getCommonList({ state, commit }: { state: State; commit: Function }): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/xbb/Common/List`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h'
        },
        params: {
          lang: 'zh-cn'
        }
      })
      .then(res => {
        if (res && res.data && res.data.data && res.data.status === '000') {
          const result = res.data.data;
          commit(Types.SET_COMMON_LIST, result);
        }
      })
      .catch(err => {
        const response = err && err.response;
        return response;
      });
  },

  getDownloadUri({ state, commit }: { state: State; commit: Function }, params: { bundleID: string; platform: string }): any {
    console.log(params);
    return axios
      .get(`${state.siteConfig.golangApiDomain}/xbb/App/Download`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h'
        },
        params: {
          lang: 'zh-cn',
          bundleID: params.bundleID,
          platform: params.platform
        }
      })
      .then(res => {
        if (res && res.data && res.data.data && res.data.status === '000') {
          return res.data.data.url;
        }
      })
      .catch(err => {
        const response = err && err.response;
        return response;
      });
  },

  getLCFSystemConfig({ state, commit, dispatch }: { state: State; commit: Function; dispatch: Function }, data = 'lcf'): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/cxbb/System/config/${data}`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h'
        },
        params: {
          lang: 'zh-cn'
        }
      })
      .then(res => {
        if (res && res.data && res.data.data && res.data.status === '000') {
          const result: any[] = res.data.data;

          let downloadConfig: IDownloadConfig = {
            h5: {
              show: false,
              uri: '',
              bundleID: ''
            },
            pwa: {
              show: false,
              uri: '',
              bundleID: ''
            },
            hide: {
              show: false,
              uri: '',
              bundleID: ''
            },
            ios: {
              show: false,
              uri: '',
              bundleID: ''
            },
            android: {
              show: false,
              uri: '',
              bundleID: ''
            }
          };
          downloadConfig.ios.show =
            result.find(i => {
              return i.name === 'showIPADownload';
            }).value === 'true';

          downloadConfig.ios.bundleID = result.find(item => {
            return item.name === 'bbosApiIOSBundleID';
          }).value;

          downloadConfig.pwa.show =
            result.find(item => {
              return item.name === 'showPWADownload';
            }).value === 'true';

          downloadConfig.pwa.bundleID = result.find(item => {
            return item.name === 'bbosApiPWABundleID';
          }).value;

          const showVisit = (downloadConfig.h5.show = result.find(item => {
            return item.name === 'showVisit';
          }));

          if (showVisit) {
            downloadConfig.h5.show = showVisit.value === 'true';
          }

          downloadConfig.android.show =
            result.find(item => {
              return item.name === 'showAPKDownload';
            }).value === 'true';

          downloadConfig.android.bundleID = result.find(item => {
            return item.name === 'bbosApiAndBundleID';
          }).value;

          downloadConfig.hide.show =
            result.find(item => {
              return item.name === 'showStoreDownload';
            }).value === 'true';

          downloadConfig.hide.bundleID = result.find(item => {
            return item.name === 'bbosApiMajaLink';
          }).value;

          commit(Types.SET_DOWNLOAD_CONIFG, downloadConfig);
        }
      })
      .catch(err => {
        const response = err && err.response;
        console.log(err);
        return response;
      });
  },

  actionLinkTo({ state }: { state: State }, target = ''): any {
    switch (target) {
      // 客端靜態客服頁面
      case 'clientService':
        if (state.hostnames && state.hostnames[0]) {
          window.location.href = `https://${state.hostnames[0]}/custom/service`;
        }
        break;

      // 客端客服連結
      case 'serviceUrl':
        if (state.commonList && state.commonList.on_service_url) {
          window.location.href = state.commonList.on_service_url;
        }
        break;

      // 客端去逛逛
      case 'visit':
        if (state.hostnames && state.hostnames[0]) {
          const agentCode = ''; // 推廣代碼
          window.location.href = `https://${state.hostnames[0]}${agentCode ? `/a/${agentCode}` : ''}`;
        }
        break;
    }
  }
};
