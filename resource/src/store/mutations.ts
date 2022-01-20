/* eslint-disable */

import { State } from './state';
import { Types } from './mutations_type';
import { camelCase } from 'lodash';

export const mutations = {
  [Types.SET_SITE_CONFIG](state: State, payload: any) {
    let result: any = {};
    // ROUTER_TPL > routerTpl
    Object.keys(payload).forEach((key) => {
      result[camelCase(key)] = payload[key];
    });
    state.siteConfig = result;
  },
  [Types.SET_VERSION](state: State, payload: any) {
    state.version = payload || '';
  },
  [Types.SET_CDN](state: State, payload: any) {
    state.cdn = payload || '';
  },
  [Types.SET_MEM_INFO](state: State, payload: any) {
    state.memInfo = payload;
  },
  [Types.SET_DOWNLOAD_CONIFG](state: State, payload: any) {
    state.downloadConfig = payload;
  },
  [Types.SET_COMMON_LIST](state: State, payload: any) {
    let result: any = {};

    Object.keys(payload).forEach((key) => {
      result[camelCase(key)] = payload[key];
    });

    state.commonList = result;
  },
  [Types.SET_HOSTNAME](state: State, payload: any) {
    // 0:預設會員登入頁,
    // 1:代理獨立網址,
    // 2:會員pwa,
    // 3:會員推廣頁,
    // 4:代理登入頁,
    // 5:代理pwa,
    // 6:落地頁,
    // 7:前導頁,
    // 13:pc
    if (!payload) {
      return;
    }

    const mapping = {
      0: 'visit',
      13: 'visitPC',
    };

    if (!mapping[payload.clientType]) {
      return;
    }

    state.hostnames[mapping[payload.clientType]] = payload.result;
  },
  [Types.SET_CLIENTDOMIAN](state: State, payload: any) {
    state.clientDomain = payload;
  },
  [Types.SET_AGENT_CHANNEL](state: State, payload: any) {
    state.agentChannel = payload;
  },
};
