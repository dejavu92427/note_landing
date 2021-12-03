<template>
  <div class="container">404</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class error404 extends Vue {
  created() {
    console.log('404');
  }
}
</script>

<style lang="scss">
.container {
  position: relative;
}
</style>
