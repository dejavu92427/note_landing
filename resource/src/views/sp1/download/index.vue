<template>
  <download />
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import ModalBox from '../../common/modalBox.vue';
import DownloadMixin from '../../../lib/mixin/download';
import DownloadPorn1 from '../../porn1/download/index.vue';

@Options({
  components: {
    modalBox: ModalBox,
    download: DownloadPorn1,
  },
})
export default class DonwloadAobo1 extends mixins(DownloadMixin) {
  // created() {}
  // mounted() {}
}
</script>

<style lang="scss">
@import '~@/assets/css/mobile/index.scss';
</style>
<style lang="scss" scoped>
@import '~@/assets/css/mobile/download.scss';
</style>
