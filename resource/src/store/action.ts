import { IAplusQueueItem, aplusQueueList as aplusQueueConfig, aplusQueueList } from '../config/aplusQueue.config';
import { IDownloadConfig, ISiteConfig } from '@/lib/interface';
import { IGTagItem, gTagList, gTagList as gtagConfig } from '../config/gtag.config';

import { State } from './state';
import { Types } from './mutations_type';
import axios from 'axios';
import sitConfigJson from '../config/site.config.json';
import versionJson from '../config/version.json';

declare global {
  interface Window {
    SITE_NAME: any;
    SITE_DOMAIN: any;
    CDN: string;
    SET_GTAG: Function;
    SENT_GTAG: Function;
    SET_YM: Function;
  }
}
export const actions = {
  // 網站初始化
  // /conf/domain nginx proxy
  initSiteInfo({ commit, dispatch }: { commit: Function; dispatch: Function }): any {
    return axios
      .get('/conf/domain')
      .then((res) => {
        if (res && res.data && res.status === 200) {
          const result: ISiteConfig = res.data;
          const targetSite = sitConfigJson.find((i) => i.DOMAIN === result.domain);

          if (targetSite) {
            commit(Types.SET_CDN, window.CDN);
            commit(Types.SET_SITE_CONFIG, targetSite);

            document.title = targetSite.SITE_NAME;
            const link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
            link.href = `/img/${targetSite.SITE_NAME}/favicon.ico`;

            // 取得廳設定
            dispatch('getCommonList');
            dispatch('getHostnames');
            commit(Types.SET_VERSION, versionJson.VERSION);
            // gtag
            if (process.env.NODE_ENV === 'production' && targetSite.PROD) {
              window.SET_GTAG(gtagConfig[targetSite.ROUTER_TPL].id);
              window.SET_YM(aplusQueueConfig[targetSite.ROUTER_TPL].id);
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
      .catch((err) => {
        console.log(err);
      });
  },

  getPlayer({ state, commit }: { state: State; commit: Function }): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/xbb/Player`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h',
        },
        params: {
          lang: 'zh-cn',
        },
      })
      .then((res) => {
        const result = res.data.data;
        commit(Types.SET_MEM_INFO, result);
        return res;
      })
      .catch((err) => {
        const response = err && err.response;
        return response;
      });
  },

  getHostnames({ state, commit }: { state: State; commit: Function }): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/xbb/Domain/Hostnames/V2`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h',
        },
        params: {
          lang: 'zh-cn',
          clientType: 0,
          withLevelHostname: true,
        },
      })
      .then((res) => {
        if (res && res.data && res.data.data && res.data.status === '000') {
          const result = res.data.data;
          commit(Types.SET_HOSTNAME, result);
        }
      })
      .catch((err) => {
        const response = err && err.response;
        return response;
      });
  },

  getCommonList({ state, commit }: { state: State; commit: Function }): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/xbb/Common/List`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h',
        },
        params: {
          lang: 'zh-cn',
        },
      })
      .then((res) => {
        if (res && res.data && res.data.data && res.data.status === '000') {
          const result = res.data.data;
          commit(Types.SET_COMMON_LIST, result);
        }
      })
      .catch((err) => {
        const response = err && err.response;
        return response;
      });
  },

  getDownloadUri({ state }: { state: State }, params: { bundleID: string; platform: string }): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/xbb/App/Download`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h',
        },
        params: {
          lang: 'zh-cn',
          bundleID: params.bundleID,
          platform: params.platform,
        },
      })
      .then((res) => {
        if (res && res.data && res.data.data && res.data.status === '000') {
          return res.data.data.url;
        }
      })
      .catch((err) => {
        const response = err && err.response;
        return response;
      });
  },

  getLCFSystemConfig({ state, commit }: { state: State; commit: Function }, data = 'lcf'): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/cxbb/System/config/${data}`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h',
        },
        params: {
          lang: 'zh-cn',
        },
      })
      .then((res) => {
        if (res && res.data && res.data.data && res.data.status === '000') {
          const result: any[] = res.data.data;

          const downloadConfig: IDownloadConfig = {
            h5: {
              show: false,
              uri: '',
              bundleID: '',
            },
            pwa: {
              show: false,
              uri: '',
              bundleID: '',
            },
            hide: {
              show: false,
              uri: '',
              bundleID: '',
            },
            ios: {
              show: false,
              uri: '',
              bundleID: '',
            },
            android: {
              show: false,
              uri: '',
              bundleID: '',
            },
          };
          downloadConfig.ios.show =
            result.find((i) => {
              return i.name === 'showIPADownload';
            }).value === 'true';

          downloadConfig.ios.bundleID = result.find((item) => {
            return item.name === 'bbosApiIOSBundleID';
          }).value;

          downloadConfig.pwa.show =
            result.find((item) => {
              return item.name === 'showPWADownload';
            }).value === 'true';

          downloadConfig.pwa.bundleID = result.find((item) => {
            return item.name === 'bbosApiPWABundleID';
          }).value;

          const showVisit = (downloadConfig.h5.show = result.find((item) => {
            return item.name === 'showVisit';
          }));

          if (showVisit) {
            downloadConfig.h5.show = showVisit.value === 'true';
          }

          downloadConfig.android.show =
            result.find((item) => {
              return item.name === 'showAPKDownload';
            }).value === 'true';

          downloadConfig.android.bundleID = result.find((item) => {
            return item.name === 'bbosApiAndBundleID';
          }).value;

          downloadConfig.hide.show =
            result.find((item) => {
              return item.name === 'showStoreDownload';
            }).value === 'true';

          downloadConfig.hide.bundleID = result.find((item) => {
            return item.name === 'bbosApiMajaLink';
          }).value;

          commit(Types.SET_DOWNLOAD_CONIFG, downloadConfig);
        }
      })
      .catch((err) => {
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
        if (state.commonList && state.commonList.onServiceUrl) {
          window.location.href = state.commonList.onServiceUrl;
        }
        break;

      // 客端去逛逛
      case 'visit':
        if (state.hostnames && state.hostnames[0]) {
          const rederralCode = localStorage.getItem('code'); // 推廣代碼
          window.location.href = `https://${state.hostnames[0]}${rederralCode ? `?a=${rederralCode}` : ''}`;
        }
        break;
    }
  },

  actionSentAnalysis({ state }: { state: State }, eventType = '', analysis = ''): any {
    if (state.siteConfig.production) {
      return;
    }

    switch (analysis) {
      case 'gtag':
        Object.keys(gTagList).some((key) => {
          if (key === state.siteConfig.routerTpl) {
            const gtagItem: IGTagItem = gTagList[key];
            window.SENT_GTAG(gtagItem[eventType]);
            return;
          }
        });

        break;

      case 'ym':
        Object.keys(aplusQueueList).some((key) => {
          if (key === state.siteConfig.routerTpl) {
            const aplusQueueItem: IAplusQueueItem = aplusQueueList[key];
            window.SET_YM(aplusQueueItem[eventType]);
            return;
          }
        });
        break;
    }
  },
};
