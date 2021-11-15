<template>
  <register />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import RegisterTpl from '../../common/register.vue';

@Options({
  components: {
    register: RegisterTpl
  },
  computed: {},
  created() {
    console.log('RegisterTpl');
  }
})
export default class RegisterPorn1 extends Vue {}
</script>
<style lang="scss"></style>
