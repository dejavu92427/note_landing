<template>
  <router-view />
</template>

<script lang="ts">
import { IMemInfo } from './lib/interface';
import { Vue } from 'vue-class-component';
import { Getter, Action } from 'vuex-class';

export default class App extends Vue {
  @Action('getPlayer') getPlayer!: Function;
  @Getter('getPlayer') memInfo!: IMemInfo;
  time: Date | undefined;

  data() {
    return {
      time: new Date()
    };
  }

  // computed
  get dateTime() {
    return this.time?.toDateString();
  }

  created() {
    console.log(this.dateTime);
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
