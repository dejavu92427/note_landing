<template>
  <div class="wrap">
    <div class="and-help"><a href="#intro">Android幫助</a></div>
    <img class="logo-corner" :src="`${cdnPath}${require('@/assets/img/sp1/logo_corner.png')}`" />
    <div class="main-header">
      <qrcode-vue id="qrcode" :value="qrcodeOpt.value" :size="qrcodeOpt.size"></qrcode-vue>
      <img class="code-tips" :src="`${cdnPath}${require('@/assets/img/sp1/code_tip.png')}`" />
    </div>
    <div class="cover-image">
      <img :src="`${cdnPath}${require('@/assets/img/sp1/appdown_sports.png')}`" />
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
        <div
          v-show="currentTab == 1"
          class="tab-1"
          :style="{ 'background-image': `url(${cdnPath}${require(`@/assets/img/andorid_virus_help/bg.jpg`)})` }"
        >
          <div class="left">
            <h1>安装威胁</h1>
            <div class="q-wrap">
              <div class="title-wrap">
                <span>Q</span>
                <h2>我的問題</h2>
              </div>
              <p>安装软体时，遇到内建防护软体报毒。</p>
              <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/Install_que.jpg')}`" alt="" />
            </div>
          </div>
          <div class="right">
            <p class="top-warning">
              本软体为最高安全等级，请安心下载畅游
              <span class="heart">♥</span>
            </p>
            <div class="a-wrap">
              <div class="title-wrap">
                <span>A</span>
                <h2>问题排除</h2>
                <p>请点击【继续安装】或【无视风险安装】，即可完成安装。</p>
              </div>
              <div class="ans">
                <div class="col">
                  <img class="logo" :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/logo1_2.png')}`" alt="" />
                  <img class="pic" :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/Install_ans01.jpg')}`" alt="" />
                </div>
                <div class="col">
                  <img class="logo" :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/logo2_2.png')}`" alt="" />
                  <img class="pic" :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/Install_ans02.jpg')}`" alt="" />
                </div>
                <div class="col">
                  <img class="logo" :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/logo3_2.png')}`" alt="" />
                  <img class="pic" :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/Install_ans03.jpg')}`" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-show="currentTab == 2"
          class="tab-2"
          :style="{ 'background-image': `url(${cdnPath}${require(`@/assets/img/andorid_virus_help/bg.jpg`)})` }"
        >
          <div class="left">
            <h1>安装威胁</h1>
            <div class="q-wrap">
              <div class="title-wrap">
                <span>Q</span>
                <h2>我的問題</h2>
              </div>
              <p>开启支付软体，出现本软体为病毒危险 提示。</p>
              <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/way_que.png')}`" alt="" />
            </div>
          </div>
          <div class="right">
            <p class="top-warning">
              本软体为最高安全等级，请安心下载畅游
              <span class="heart">♥</span>
            </p>
            <div class="a-wrap">
              <div class="title-wrap">
                <span>A</span>
                <h2>问题排除</h2>
              </div>
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

              <div class="ans">
                <div class="top">
                  <h4>操作步骤</h4>
                  <div v-if="currentButton == 'oppo'"><h5>请至【手机管家 > 支付保护】 将使用的支付应用【关闭检测】，即可正常使用。</h5></div>
                  <div v-if="currentButton == 'vivo'">
                    <h5>请至【i 管家(更多) > 公用程式工具 > 支付保险箱 > 管理应用程式】将使用的支付应用【关闭检测】，即可正常使用。</h5>
                  </div>
                  <div v-if="currentButton == 'huawei'"><h5>请至【设置 > 安全 > 支付保护中心】将使用的支付应用【关闭检测】，即可正常使用。</h5></div>
                </div>
                <div class="bottom" v-if="currentButton == 'oppo'">
                  <div class="col">
                    <span>步骤 1</span>
                    <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/oppo_ans01.jpg')}`" alt="" />
                  </div>
                  <div class="col">
                    <span>步骤 2</span>
                    <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/oppo_ans02.jpg')}`" alt="" />
                  </div>
                </div>
                <div class="bottom" v-if="currentButton == 'vivo'">
                  <div class="col">
                    <span>步骤 1</span>
                    <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/vivo_ans01.jpg')}`" alt="" />
                  </div>
                  <div class="col">
                    <span>步骤 2</span>
                    <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/vivo_ans02.jpg')}`" alt="" />
                  </div>
                  <div class="col">
                    <span>步骤 3</span>
                    <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/vivo_ans03.jpg')}`" alt="" />
                  </div>
                </div>
                <div class="bottom" v-if="currentButton == 'huawei'">
                  <div class="col">
                    <span>步骤 1</span>
                    <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/huawei_ans01.jpg')}`" alt="" />
                  </div>
                  <div class="col">
                    <span>步骤 2</span>
                    <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/huawei_ans02.jpg')}`" alt="" />
                  </div>
                  <div class="col">
                    <span>步骤 3</span>
                    <img :src="`${cdnPath}${require('@/assets/img/andorid_virus_help/huawei_ans03.jpg')}`" alt="" />
                  </div>
                </div>
              </div>
            </div>
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
      desc: '安装威胁',
    },
    {
      id: 2,
      desc: '支付软体报毒',
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
<style lang="scss">
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
  height: 81.2vh;
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
    margin-top: 20px;

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

  .tab-1 {
    height: 100vh;
    display: flex;
    justify-content: center;
    text-align: start;
    .left {
      margin-right: 20px;
      h1 {
        font-size: 45px;
        font-weight: bold;
      }
      .q-wrap {
        width: 330px;
        height: 606px;
        border: 1px solid #e0e0e0;
        background: rgba(232, 232, 232, 0.3);
        overflow: hidden;
        border-radius: 10px;
        padding: 20px;
        color: #666666;
        font-weight: bold;

        img {
          width: 100%;
          height: auto;
          border-radius: 15px;
          margin-top: 30px;
          border: 1px solid #e8e8e8;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;

      .top-warning {
        font-size: 16px;
        color: #d41c26;
        text-align: end;
        margin-top: 30px;
        margin-bottom: 62px;
      }
      .a-wrap {
        width: 920px;
        height: 606px;
        border: 1px solid #e0e0e0;
        background: rgba(232, 232, 232, 0.3);
        overflow: hidden;
        border-radius: 10px;
        padding: 20px;

        p {
          color: #666666;
          font-size: 16px;
          margin-left: 20px;
        }

        .ans {
          display: flex;
          align-items: center;
          justify-content: space-around;

          .col {
            width: 32%;

            .logo {
              display: block;
              width: 50%;
              margin: 0 auto;
            }
            .pic {
              width: 100%;
              border-radius: 15px;
              border: 1px solid #e8e8e8;
            }
          }
        }
      }
    }
  }

  .tab-2 {
    height: 100vh;
    display: flex;
    justify-content: center;
    text-align: start;
    .left {
      margin-right: 20px;
      h1 {
        font-size: 45px;
        font-weight: bold;
      }
      .q-wrap {
        width: 330px;
        height: 414px;
        border: 1px solid #e0e0e0;
        background: rgba(232, 232, 232, 0.3);
        overflow: hidden;
        border-radius: 10px;
        padding: 20px;
        color: #666666;
        font-weight: bold;

        img {
          width: 100%;
          height: auto;
          border-radius: 15px;
          margin-top: 30px;
          border: 1px solid #e0e0e0;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;

      .top-warning {
        font-size: 16px;
        color: #d41c26;
        text-align: end;
        margin-top: 30px;
        margin-bottom: 62px;
      }
      .a-wrap {
        position: relative;
        width: 920px;
        height: 688px;
        border: 1px solid #e0e0e0;
        background: rgba(232, 232, 232, 0.3);
        overflow: hidden;
        border-radius: 10px;
        padding: 20px;

        .button-wrap {
          position: absolute;
          top: 10px;
          right: 10px;
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

        .ans {
          .top {
            padding: 0 10px;
            h4 {
              color: #000;
              font-size: 20px;
              font-weight: bold;
              margin: 5px;
            }
            h5 {
              color: #666666;
              font-size: 16px;
              font-weight: bold;
              margin: 5px;
            }
          }
          .bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
            .col {
              width: 30%;
              margin: 0 5px;
              span {
                font-size: 16px;
                font-weight: bold;
                color: #212121;
              }
              img {
                margin-top: 15px;
                width: 100%;
                border-radius: 15px;
                border: 1px solid #e8e8e8;
              }
            }
          }
        }
      }
    }
  }
  .title-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    top: -32px;
    left: -20px;
    span {
      display: block;
      width: 80px;
      height: 46px;
      color: #fff;
      background: linear-gradient(180deg, #32de84, #0fb960);
      font-size: 30px;
      font-weight: bold;
      border-radius: 0 23px 23px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h2 {
      color: #212121;
      margin-left: 15px;
    }
    p {
      color: #666666;
      font-size: 16px;
      font-weight: bold;
      margin-left: 20px;
    }
  }
  .heart {
    margin-left: 10px;
    width: 20px;
    padding: 3px 6px;
    background-color: #dd3232;
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
  }
}
</style>
