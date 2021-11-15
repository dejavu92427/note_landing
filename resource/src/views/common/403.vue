<template>
  <div class="container">
    403
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <!-- <div>
      <img class="swiper-slide-img" src="@/assets/img/sports_main.png" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Getter, Action } from 'vuex-class';
import { ISiteConfig } from '../../lib/interface';

//  落地頁下載
@Options({
  components: {}
})
export default class HomePorn1 extends Vue {
  @Action('getPlayer') getPlayer!: Function;

  @Getter('getSiteConfig') siteConfig!: ISiteConfig;

  created() {
    console.log('noService');
  }

  // mounted() {}
}
</script>

<style lang="scss">
.container {
  position: relative;
}
</style>
