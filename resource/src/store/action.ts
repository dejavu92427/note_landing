import { IAgentChannel, IDownloadConfig } from '@/lib/interface';
import { IAplusQueueItem, aplusQueueList as aplusQueueConfig, aplusQueueList } from '../config/aplusQueue.config';
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
    SENT_YM: Function;
  }
}

declare global {
  const DeviceInfo: {
    getDeviceInfo: Function;
  };
}

export const actions = {
  // 網站初始化
  // /conf/domain nginx proxy
  initSiteInfo({ commit }: { commit: Function; dispatch: Function }): any {
    //1.取得domain並對應到site.config.json的資料去設定 SET_CDN，SET_SITE_CONFIG，網站標題，icon

    return axios
      .get('/conf/domain')
      .then(res => {
        if (res && res.data && res.status === 200) {
          const result = res.data;
          const targetSite = sitConfigJson.find(i => i.DOMAIN === result.domain);
          if (targetSite) {
            commit(Types.SET_SITE_CONFIG, targetSite);

            if (result.cdn && targetSite.PROD) {
              commit(Types.SET_CDN, result.cdn.startsWith('http') ? result.cdn : `https://${result.cdn}`);
            }

            document.title = targetSite.SITE_NAME;
            const link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
            link.href = `/img/${targetSite.ROUTER_TPL}/favicon.ico`;

            const appleTouchIcon = document.createElement('link');
            appleTouchIcon.rel = 'apple-touch-icon';
            link.href = `/img/${targetSite.ROUTER_TPL}/icon-192x192.png`;
            link.setAttribute('sizes', '192x192');
            // document.head.appendChild(appleTouchIcon);//=
            // appleTouchIcon.rel = 'apple-touch-icon';//=
            // appleTouchIcon.href = `/img/${targetSite.ROUTER_TPL}/icon-192x192.png`;//=
            // appleTouchIcon.setAttribute('sizes', '192x192');//=上面怪怪的????(apple-touch-icon為iphone的safari-分享-新增網頁至桌面的圖示)

            commit(Types.SET_VERSION, versionJson.VERSION);

            //這段是要讓進入落地頁時是pc網頁會顯示qrcode讓用戶拿起手機掃
            //會串code,channelID
            const qrUrl = new URL(`https://${window.location.host}`); //localhost:8880//轉成URL物件可以讓query自動判斷?&去添加
            const refCode = localStorage.getItem('code'); // 推廣代碼
            const channelid = Number(localStorage.getItem('channelid')) || 0;
            if (refCode) qrUrl.searchParams.append('code', refCode);
            if (channelid) qrUrl.searchParams.append('channelid', channelid.toString());
            localStorage.setItem('referral-link', qrUrl.toString());

            // gtag 友盟
            if (targetSite.PROD) {
              window.SET_GTAG(gtagConfig[targetSite.ROUTER_TPL].id);

              if (aplusQueueConfig[targetSite.ROUTER_TPL]) {
                window.SET_YM(aplusQueueConfig[targetSite.ROUTER_TPL].id);
              }
            }
          } else {
            window.location.href = '/404';
          }

          return;
        } else {
          window.location.href = '/404';
          // commit(Types.SET_SITE_CONFIG, sitConfigJson[0]);
          return;
        }
      })
      .catch(err => {
        console.log({ ...err });

        const retryWrapper = (axios, options) => {
          const maxTime = options.retryTime;
          // const retry_status_code = options.retry_status_code;

          let counter = 0;
          axios.interceptors.response.use(null, error => {
            /** @type {import("axios").AxiosRequestConfig} */
            const config = error.config;
            if (counter < maxTime && error.isAxiosError) {
              counter++;
              return new Promise(resolve => {
                resolve(axios(config));
              });
            }
            return Promise.reject(error);
          });
        };

        async function main() {
          try {
            retryWrapper(axios, { retryTime: 3 });
            await axios.get('/conf/domain').then(() => {
              window.location.reload();
            });
          } catch {
            alert('网路连线异常,请尝试重新连线');
            window.location.reload();
          }
        }
        if (err.isAxiosError) {
          setTimeout(() => {
            console.log('retry0');
            main();
            console.log('retry1');
          }, 500);
        }
      });
  },

  getPlayer({ state, commit }: { state: State; commit: Function }): any {
    return axios({
      method: 'get',
      url: `${state.siteConfig.golangApiDomain}/xbb/Player`,
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
        console.log(err);
        return response;
      });
  },

  getHostnames({ state, commit }: { state: State; commit: Function }, params: any): any {
    // 0:預設會員登入頁,
    // 1:代理獨立網址,
    // 2:會員pwa,
    // 3:會員推廣頁,
    // 4:代理登入頁,
    // 5:代理pwa,
    // 6:落地頁,
    // 7:前導頁,
    // 13:pc
    const clientType = (params && params.clientType) || 0;

    return axios
      .get(`${state.siteConfig.golangApiDomain}/xbb/Domain/Hostnames/V2`, {
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h'
        },
        params: {
          lang: 'zh-cn',
          clientType: clientType,
          withLevelHostname: true
        }
      })
      .then(res => {
        if (res && res.data && res.data.data && res.data.status === '000') {
          const result = res.data.data;
          commit(Types.SET_HOSTNAME, { clientType: clientType, result: result });
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

  setDownloadRSA({ state }: { state: State }, data: string): any {
    //研究要怎麼轉碼????
    const buffer = Buffer.from(data, 'base64');
    const bufString = buffer.toString('hex');

    return axios({
      method: 'put',
      url: `${state.siteConfig.channelApiDomain}/cxbb/AgentChannel/setDownload`,
      headers: {
        'x-domain': state.siteConfig.domain,
        kind: 'h'
      },
      data: {
        rsa: bufString
      }
    }).catch(err => {
      console.log(err);
    });
  },

  getDownloadUri({ state }: { state: State }, params: { bundleID: string; platform: string }): any {
    const agentChannel = state.agentChannel;

    if (agentChannel && params.platform === '2') {
      //如果是pwa 這支api Content-Type: application/octet-stream  回應二進制檔案
      //把api的回應放入一個a連結，js操控click觸發連結，下載檔案(沒有實際appendchild，形成按下急速版下載，就下載的假象)
      return axios({
        method: 'post',
        url: `${state.siteConfig.channelApiDomain}/cxbb/AgentChannel/getMobileConfig${
          state.siteConfig.prod ? '' : 'V2'
        }`,
        responseType: 'blob',
        headers: {
          'x-domain': state.siteConfig.domain,
          kind: 'h'
        },
        data: {
          lang: navigator.language,
          bundleID: params.bundleID,
          platform: params.platform,
          channelid: +agentChannel.channelid,
          uuid: agentChannel.uuid,
          code: agentChannel.code
        }
      })
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data])); //#blob:http://localhost:8880/1fa557c3-56c4-4c67-8680-21cfcae55420
          //1.new Blob(array,option) array為buffer[](上述提到的octet-stream為此格式),option{type: 定義資料的MIME格式
          //2.window.URL.createObjectURL(Blob)產生blob url (以靜態(存在瀏覽器)方式佔用內存，並可供下訪問下載)
          //???? 1.URL.revokeObjectURL()， 2.有空可以一下原理

          let fileName = `${agentChannel.code}.mobileconfig`; //取blob連結的字串作為檔名(1fa557c3-56c4-4c67-8680-21cfcae55420)
          if (url && url.split('/') && url.split('/')[3]) {
            fileName = `${url.split('/')[3]}.mobileconfig`;
          }

          const blob = new Blob([res.data], { type: 'application/x-apple-aspen-config' }); //指定type可以略過"是否下載？"的alert

          const a = document.createElement('a');
          a.download = fileName; //download屬性(a.herf="圖片"會在新視窗開啟圖片，加了download則為直接下載 若有給download="x"則以x命名)//這邊好像不加也沒差????
          a.href = window.URL.createObjectURL(blob);
          a.click();

          document.body.removeChild(a); //沒有appendchild為什麼要remove  ，還導致l:246沒回傳

          return Promise.resolve('agentPWA'); //回傳promise狀態為完成的物件 Promise{<fulfilled> 'agentPWA'}
        })
        .catch(err => {
          const response = err && err.response;
          return response;
        });
    }

    const downloadLink = state.siteConfig.prod ? 'xbb/App/Download' : 'xbb/Service/In/App/Download/V2';

    return axios //ios/android app 下載 取得 .mobileconfig / .apk
      .get(`${state.siteConfig.golangApiDomain}/${downloadLink}`, {
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

  getClientDomain({ state, commit }: { state: State; commit: Function }): any {
    return axios
      .get(`${state.siteConfig.golangApiDomain}/cxbb/System/clientDomain`, {
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
          const result = res.data?.data[0]?.value || '';
          commit(Types.SET_CLIENTDOMIAN, result);
        }
      })
      .catch(err => {
        const response = err && err.response;
        return response;
      });
  },

  getLCFSystemConfig({ state, commit }: { state: State; commit: Function }, data = 'lcf'): any {
    //取得bundleID and 要不要顯示下載按鈕
    if (state && state.siteConfig && state.siteConfig.golangApiDomain) {
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

            const downloadConfig: IDownloadConfig = {
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
    } else {
      return null;
    }
  },

  actionLinkTo({ state }: { state: State }, target = ''): any {
    switch (target) {
      // 客端靜態客服頁面
      case 'clientService':
        if (state.clientDomain) {
          window.location.href = `${
            state.clientDomain.startsWith('http')
              ? `${state.clientDomain}/custom/service`
              : `https://${state.clientDomain}/custom/service`
          }`;
        }
        break;

      // 客端客服連結
      case 'serviceUrl':
        if (state.commonList && state.commonList.onServiceUrl) {
          window.location.href = state.commonList.onServiceUrl;
        }
        break;

      // 客端去逛逛
      case 'visit': {
        if (state.hostnames && state.hostnames[target]) {
          const visitHost = state.hostnames[target];
          const refCode = localStorage.getItem('code'); // 推廣代碼
          const channelid = Number(localStorage.getItem('channelid')) || 0;

          if (!visitHost || !visitHost[0]) {
            return;
          }

          const url = new URL(visitHost[0].startsWith('http') ? visitHost[0] : `https://${visitHost[0]}`);

          if (refCode) {
            url.searchParams.append('code', refCode);
          }

          if (channelid) {
            url.searchParams.append('channelid', channelid.toString());
          }

          // console.log(url.href);
          window.location.href = url.href;
          return;
        }
        break;
      }

      case 'visitPC': {
        if (state.hostnames && state.hostnames[target]) {
          const visitPCHost = state.hostnames[target];
          const refCode = localStorage.getItem('code'); // 推廣代碼
          const channelid = Number(localStorage.getItem('channelid')) || 0;

          if (!visitPCHost || !visitPCHost[0]) {
            return;
          }

          const url = new URL(visitPCHost[0].startsWith('http') ? visitPCHost[0] : `https://${visitPCHost[0]}`);

          if (refCode) {
            url.pathname = `a/${refCode}`;
            // url.searchParams.append('code', refCode);
          }

          if (channelid) {
            url.searchParams.append('channelid', channelid.toString());
          }

          return url;
        }
      }
    }
  },

  actionSentAnalysis({ state }: { state: State }, { eventType = '' }): any {
    if (!state.siteConfig.prod) {
      return;
    }
    // gtag
    Object.keys(gTagList).some(key => {
      if (key === state.siteConfig.routerTpl) {
        const gtagItem: IGTagItem = gTagList[key];
        window.SENT_GTAG(gtagItem[eventType]);
        return;
      }
    });

    // ym
    Object.keys(aplusQueueList).some(key => {
      if (key === state.siteConfig.routerTpl) {
        const aplusQueueItem: IAplusQueueItem = aplusQueueList[key];
        window.SENT_YM(aplusQueueItem[eventType]);
        return;
      }
    });
  },

  setAgentDeviceInfo({ state, commit }: { state: State; commit: Function }, params: any): any {
    if (!params || !params.data) {
      return;
    }
    // base64 to hex
    const buffer = Buffer.from(params.data, 'base64');
    const bufString = buffer.toString('hex');
    // console.log('params hex:', bufString);

    localStorage.removeItem('uuid');

    return axios
      .put(
        `${state.siteConfig.channelApiDomain}/cxbb/AgentChannel/AgentDeviceInfo`,
        {
          rsa: bufString
        },
        {
          headers: {
            'x-domain': state.siteConfig.domain,
            kind: 'h',
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        const result: IAgentChannel = {
          uuid: '',
          channelid: 0,
          code: '',
          appkey: state.siteConfig.domain
        };

        if (res && res.data && res.data.data && res.data.status === '000') {
          result.channelid = res.data.data.channelid;
          result.code = res.data.data.code;
          result.uuid = res.data.data.uuid;

          localStorage.setItem('code', result.code);
          localStorage.setItem('channelid', result.channelid.toString());
          localStorage.setItem('uuid', res.data.data.uuid || '');
        }

        commit(Types.SET_AGENT_CHANNEL, result);
      })
      .catch(err => {
        const response = err && err.response;
        return response;
      });
  }
};
