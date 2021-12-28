<template>
  <noService />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NoService from '../../common/noService.vue';

@Options({
  components: {
    noService: NoService,
  },
})
export default class NosServicSp1 extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/css/variable/sp1.scss';
</style>

<style lang="scss" scoped></style>
