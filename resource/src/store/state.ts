import { ICommonConfig, IDownloadConfig, IMemInfo, ISiteConfig } from '../lib/interface'; // --> OFF

/* eslint-disable */

export interface State {
  memInfo: IMemInfo;
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
    golangApiDomain: ''
  },
  commonList: {
    on_service_url: ''
  },
  downloadConfig: {
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
  hostnames: [],
  version: {}
};
