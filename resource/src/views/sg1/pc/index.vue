<template>
  <sg1Download />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import sg1Download from '../download/index.vue';

@Options({
  components: {
    sg1Download,
  },
})
export default class PcSg1 extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/css/mobile/index.scss';
</style>
