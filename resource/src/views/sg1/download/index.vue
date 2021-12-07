<template>
  <div class="container">
    <!-- 圖片需放/assets/img 底下 img.hash.png -->
    <!-- <div>
      <img class="swiper-slide-img" src="@/assets/img/sports_main.png" />
    </div> -->

    <modalBox v-show="showModal" @close="toogleModal(false)" />
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import ModalBox from '../../common/modalBox.vue';
import DownloadMixin from '../../../lib/mixin/download';

@Options({
  components: {
    modalBox: ModalBox,
  },
})
export default class DonwloadSg1 extends mixins(DownloadMixin) {
  // created() {}
  // mounted() {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mobile/index.scss';
</style>
