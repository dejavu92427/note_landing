<template>
  <downloadCommon />
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import DownloadMixin from '../../../lib/mixin/download';
import DownloadCommon from '../../common/download.vue';

@Options({
  components: {
    downloadCommon: DownloadCommon,
  },
  // mixins: [DownloadMixin],
})
export default class DownloadSp1 extends mixins(DownloadMixin) {
  // created() {}
  // mounted() {}
}
</script>

<style lang="scss">
@import '~@/assets/css/mobile/index.scss';
@import '~@/assets/css/variable/sp1.scss';
</style>
<style lang="scss" scoped>
@import '~@/assets/css/mobile/download.scss';
</style>
