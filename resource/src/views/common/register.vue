<template>
  <div class="container">
    register
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Getter, Action } from 'vuex-class';
import { ISiteConfig } from '../../lib/interface';

export default class RegisterTpl extends Vue {
  @Action('getPlayer') getPlayer!: Function;

  @Getter('getSiteConfig') siteConfig!: ISiteConfig;

  timer: number | undefined = undefined;
  sec = 3;

  data() {
    return {
      timer: undefined,
      sec: 3
    };
  }

  created() {
    console.log('launch RegisterTpl', this.siteConfig.domain);
    console.log(this.sec);
  }

  // mounted() {}
}
</script>

<style lang="scss" module></style>
