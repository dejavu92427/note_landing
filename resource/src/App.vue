<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Action } from 'vuex-class';

export default class App extends Vue {
  @Action('getPlayer') getPlayer!: Function;

  // time: Date | undefined;

  // data() {
  //   return {
  //     time: new Date()
  //   };
  // }

  // computed;
  get dateTime() {
    return new Date().toUTCString();
  }
}
</script>
<style lang="scss">
@import '~@/assets/css/index.scss';
</style>
