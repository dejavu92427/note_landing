<template>
  <downloadCommon />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DownloadCommon from '../../common/download.vue';

@Options({
  components: {
    downloadCommon: DownloadCommon,
  },
})
export default class DownloadSp1 extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/css/mobile/index.scss';
@import '~@/assets/css/variable/sp1.scss';
</style>
