/* eslint-disable */
declare module '*.vue' {
  import Vue from 'vue-class-component';
  export default Vue;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {}
}
