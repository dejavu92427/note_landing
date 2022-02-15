<template>
  <div class="wrap">
    <div class="and-help"><a href="#intro">Android幫助</a></div>
    <img class="logo-corner" :src="`${cdnPath}${require('@/assets/img/aobo1/logo_corner.png')}`" />
    <div class="main-header">
      <qrcode-vue id="qrcode" :value="qrcodeOpt.value" :size="qrcodeOpt.size"></qrcode-vue>
      <img class="code-tips" :src="`${cdnPath}${require('@/assets/img/aobo1/code_tip.png')}`" />
    </div>
    <div class="cover-image">
      <img :src="`${cdnPath}${require('@/assets/img/aobo1/appdown_sports.png')}`" />
    </div>
    <div class="android-container" id="intro">
      <div class="header">
        <div class="logo">
          <img :src="`${cdnPath}${require('@/assets/img/andlogo-w.png')}`" :style="{ width: '48px' }" alt="" />
          android问题排除
        </div>
        <div class="desc">
          <span class="test" v-for="tab in tabItem" :key="tab.id" :class="{ active: currentTab == tab.id }" @click="setActive(tab.id)">
            {{ tab.desc }}
          </span>
        </div>
      </div>
      <div class="content">
        <img v-show="currentTab == 1" :src="`${cdnPath}${require('@/assets/img/an_install_tab1.png')}`" alt="" />
        <div v-show="currentTab == 2">
          <img :src="`${cdnPath}${require('@/assets/img/an_install_tab2.png')}`" alt="" />
          <div class="button-wrap">
            <button
              v-for="item in buttonList"
              :key="item.name"
              :class="[item.name, { active: currentButton == item.name }]"
              @click="setBtnActive(item.name)"
            >
              {{ item.name }}
            </button>
          </div>

          <div class="answer-wrap">
            <img v-if="currentButton == 'oppo'" :src="`${cdnPath}${require('@/assets/img/pc-answer-1.png')}`" alt="" />
            <img v-if="currentButton == 'vivo'" :src="`${cdnPath}${require('@/assets/img/pc-answer-2.png')}`" alt="" />
            <img v-if="currentButton == 'huawei'" :src="`${cdnPath}${require('@/assets/img/pc-answer-3.png')}`" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Getter } from 'vuex-class';
import { isMobile } from '../../../lib/isMobile';
import qrcodeVue from 'qrcode.vue';
import { initRouterReferralCode } from '../../../lib/referralCode';

@Options({
  components: {
    qrcodeVue,
  },
})
export default class PcAobo1 extends Vue {
  @Getter('getCDN') cdnPath!: string;

  qrcodeOpt = {
    value: '',
    size: 152,
  };

  currentTab = 1;
  currentButton = 'oppo';
  tabItem = [
    {
      id: 1,
      desc: '安裝威脅',
    },
    {
      id: 2,
      desc: '支付軟體報毒',
    },
  ];
  buttonList = [
    {
      name: 'oppo',
    },
    {
      name: 'vivo',
    },
    {
      name: 'huawei',
    },
  ];

  created() {
    if (isMobile()) {
      this.$router.push({
        name: 'download',
        query: { ...this.$route.query },
      });
      return;
    }

    if (this.$route.query) {
      initRouterReferralCode(this.$route.query);
    }

    this.qrcodeOpt.value = `${localStorage.getItem('referral-link')}`;
  }
  setActive(target): void {
    if (target) {
      this.currentTab = target;
    } else {
      return;
    }
  }

  setBtnActive(target): void {
    if (target) {
      this.currentButton = target;
    } else {
      return;
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  max-width: unset;
  min-width: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  border: none;
  margin: 0 auto !important;
}

.wrap {
  display: table-cell;
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.logo-corner {
  position: absolute;
  top: 0;
  left: 0;
  width: 145px;
  height: 145px;
  margin: 0 auto;
}

.main-header {
  margin-top: 18px;
}

.code-tips {
  width: 198px;
  height: 175px;
  margin-left: 22px;
}

.cover-image {
  height: 83.35vh;
  width: 90vw;
  margin: 0 auto;
  margin-top: 45px;

  > img {
    width: 100%;
    // height: 100%;
  }
}

.and-help {
  position: absolute;
  width: 150px;
  height: 40px;
  right: 10px;
  top: 1005px;
  a {
    text-decoration: none;
    background: #000;
    color: #fff;
    padding: 5px;
  }
}

.android-container {
  width: 100vw;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
    color: #fff;
    padding: 20px;

    .logo {
      font-size: 36px;
    }
    .desc {
      span {
        margin: 0 10px;
        padding: 24px 0;
        font-size: 18px;
        cursor: pointer;
        &.active {
          color: #32de84;
          border-bottom: 5px solid #32de84;
        }
      }
    }
  }
}

.button-wrap {
  position: absolute;
  top: 1245px;
  right: 373px;

  button {
    width: 140px;
    height: 46px;
    border: none;
    margin: 2px;
    border-radius: 3px;
    cursor: pointer;
    &.oppo {
      &.active {
        background-color: #0d6a30;
        color: #fff;
      }
    }
    &.vivo {
      &.active {
        background-color: #425eff;
        color: #fff;
      }
    }
    &.huawei {
      &.active {
        background-color: #d41c26;
        color: #fff;
      }
    }
  }
}

.answer-wrap {
  position: absolute;
  z-index: 10;
  top: 1300px;
  right: 400px;
  img {
    width: 800px;
    height: auto;
  }
}
</style>
