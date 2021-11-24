import { ICommonConfig, IDownloadConfig, IPlayer, ISiteConfig } from '../lib/interface';

/* eslint-disable */

export interface State {
  memInfo: IPlayer;
  siteConfig: ISiteConfig;
  cdn: string;
  downloadConfig: IDownloadConfig;
  commonList: ICommonConfig;
  hostnames: string[];
  version: {};
}

export const state: State = {
  memInfo: {},
  cdn: '',
  siteConfig: {
    domain: '',
    routerTpl: '',
    themtTpl: '',
    siteName: '',
    golangApiDomain: '',
    pord: false
  },
  // 前端網站配置客服連結
  commonList: {
    on_service_url: ''
  },
  // 下載開關
  downloadConfig: {
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
  },
  // 客端網址
  hostnames: [],
  version: {}
};
