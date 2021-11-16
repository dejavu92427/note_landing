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

  created() {
    console.log('APP:', this.dateTime);
  }
}
</script>
<style lang="scss">
body {
  max-width: 420px;
  min-width: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  border: none;
  margin: 0 auto !important;
}
</style>

function isMobile() { throw new Error('Function not implemented.'); } function isMobile() { throw new Error('Function not implemented.'); }
