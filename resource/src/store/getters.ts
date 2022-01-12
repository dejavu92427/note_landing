import { State } from './state';

export const getters = {
  getSiteConfig: (state: State) => state.siteConfig,
  getCDN: (state: State) => state.cdn,
  getVersion: (state: State) => state.version,
  getPlayer: (state: State) => state.memInfo,
  getDonwloadConfig: (state: State) => state.downloadConfig,
  getCommonList: (state: State) => state.commonList,
  getHostnames: (state: State) => state.hostnames,
  getClientDomain: (state: State) => state.clientDomain,
  getAgentChannel: (state: State) => state.agentChannel,
};
