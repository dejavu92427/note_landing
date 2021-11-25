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
    state.version = payload;
  },
  [Types.SET_CDN](state: State, payload: any) {
    state.cdn = payload;
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
    console.log(result);
  },
  [Types.SET_HOSTNAME](state: State, payload: any) {
    state.hostnames = payload;
  },
};
