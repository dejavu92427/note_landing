import merge from 'lodash/merge';

export default merge({
  root: {
    rootPorn1: () => import(/* webpackChunkName: 'rootPorn1' */ '../../views/mobile/porn1/index.vue')
  }
});
