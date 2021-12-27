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
  // mixins: [DownloadMixin],
})
export default class DownloadPorn1 extends Vue {
  // created() {}
  // mounted() {}
}
</script>

<style lang="scss">
@import '~@/assets/css/variable/porn1.scss';
</style>
