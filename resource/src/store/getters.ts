import { State } from './state';

export const getters = {
  getSiteConfig: (state: State) => state.siteConfig,
  getCDN: (state: State) => state.cdn,
  getPlayer: (state: State) => state.memInfo,
  getDonwloadConfig: (state: State) => state.downloadConfig,
  getCommonList: (state: State) => state.commonList,
  getHostnames: (state: State) => state.hostnames
};
