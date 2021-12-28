<template>
  <upup />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Upup from '../../common/upup.vue';

@Options({
  components: {
    upup: Upup,
  },
})
export default class UpupSg1 extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/css/variable/sg1.scss';
</style>

<style lang="scss" scoped></style>
