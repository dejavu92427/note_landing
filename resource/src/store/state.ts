import { IAgentChannel, ICommonConfig, IDownloadConfig, IPlayer, ISiteConfig } from '../lib/interface';

export interface State {
  memInfo: IPlayer;
  siteConfig: ISiteConfig;
  cdn: string;
  downloadConfig: IDownloadConfig;
  commonList: ICommonConfig;
  hostnames: string[];
  clientDomain: string;
  agentChannel: IAgentChannel;
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
    prod: false,
    andAppSchema: '',
    iosAppSchema: '',
  },
  // 前端網站配置客服連結
  commonList: {
    onServiceUrl: '',
  },
  // 下載開關
  downloadConfig: {
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
  },
  // 客端網址
  hostnames: [],
  clientDomain: '',
  agentChannel: {
    channelid: 0,
    code: '',
    uuid: '',
  },
  version: {},
};
