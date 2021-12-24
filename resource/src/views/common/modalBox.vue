<template>
  <div class="modal_wrap">
    <div class="modal_box">
      <p>{{ text }}</p>
      <button @click="$emit('close')">确认</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class ModalBox extends Vue {
  text = '极速版下载只支持 Safari 浏览器哦~  ';
  get getText() {
    return this.text;
  }
}
</script>

<style lang="scss" scoped>
.modal_wrap {
  opacity: 1;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  -ms-touch-action: none;
  touch-action: none;
  -webkit-overflow-scrolling: none;

  .modal_box {
    -webkit-transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 7px;
    left: 50%;
    max-width: 70%;
    padding: 10px;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: 100;
  }

  p {
    color: #a5a9b3;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  button {
    background: transparent;
    border: none;
    color: var(--popup_text);
    display: block;
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    margin-top: 5px;
    padding: 0;
    width: 100%;
  }
}
</style>
