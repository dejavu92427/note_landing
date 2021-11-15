import { createStore } from 'vuex';
import { state } from './state';
import { actions } from './action';
import { getters } from './getters';
import { mutations } from './mutations';

export const store = createStore({
  actions,
  getters,
  mutations,
  state
});
