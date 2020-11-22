<template>
  <section class="place-container">
    <section class="card">
      <div class="item">
        <div>参观场所</div>
        <div class="info">
          <span style="color: #333"> 闸弄口站 </span>
          <span class="nav">导航</span>
        </div>
      </div>
    </section>

    <!--  -->
    <section class="card" v-for="(para, i) in pickers" :key="'p' + i">
      <div class="item">
        <div>{{ para.title }}</div>
        <div class="pick" @click="handlerClick(i)">
          <span class="font" v-if="params[para.key]"
            >{{ params[para.key] }}
          </span>
          <span v-else>请输入</span>
          <van-icon name="arrow" size="18" color="#ccc" />
        </div>
        <van-popup v-model="pickers[i].show" round position="bottom">
          
          <van-picker
            show-toolbar
            :title="para.title"
            :columns="pickers[i].column"
            @cancel="pickers[i].show = false"
            @confirm="confirm(i, $event)"
          >
          </van-picker>

        </van-popup>
      </div>
    </section>

    <!--  -->
    <section class="card" v-for="(item, i) in forms" :key="'f' + i">
      <div class="inp">
        <span> 姓名：</span
        ><input ref="name" class="input" type="text" placeholder="请输入姓名" />
      </div>
      <div class="inp">
        <span> 身份证号：</span
        ><input
          ref="idCard"
          class="input"
          type="text"
          placeholder="请输入身份证号"
        />
      </div>
      <div class="inp">
        <span> 手机号：</span
        ><input
          class="input"
          ref="tel"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
    </section>
    <section class="btn">
      <van-button
        class="pre"
        :loading="loading"
        type="info"
        loading-text="加载中..."
        @click="handlerPreBtnClick"
      >
        预约
      </van-button>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      params: {
        preCount: 0,
        preDate: "",
        preRank: "",
        preType: "",
      },

      datePicker: {
        show: false,
        key: "preDate",
        title: "请选择日期",
        column: ["11-9", "11-10", "11-11"],
      },
      rankPicker: {
        show: false,
        key: "preRank",
        title: "请选择场次",
        column: ["场次1", "场次2", "场次3"],
      },
      countPicker: {
        show: false,
        key: "preCount",
        title: "请选择人数",
        column: [1, 2, 3],
      },
      comPicker: {
        key: "preType",
        show: false,
        title: "请选择团体",
        column: ["团体1", "团体2", "团体3"],
      },
      peoples: [],
    };
  },
  computed: {
    forms() {
      return new Array(this.params.preCount);
    },
    pickers() {
      return [
        this.datePicker,
        this.rankPicker,
        this.comPicker,
        this.countPicker,
      ];
    },
  },
  methods: {
    confirm(i, e) {
      this.params[this.pickers[i].key] = e;
      this.pickers[i].show = false;
    },
    handlerClick(i) {
      this.pickers[i].show = true;
      
    },
    handlerPreBtnClick() {
      let lgh = this.forms.length;
      for (let i = 0; i < lgh; i++) {
        this.peoples.push({
          name: this.$refs.name[i].value,
          idCard: this.$refs.idCard[i].value,
          tel: this.$refs.tel[i].value,
        });
      }
      console.log(this.peoples);
      console.log(this.params)
    },
  },
};
</script>

<style lang='scss' >
// reset
.van-picker-column__item--selected{
  color: red;
}
.van-popup--bottom.van-popup--round{
  border-radius: 20px;
}
// .van-picker-column__item{
//   border-top: .01rem solid #ddd; 
// }
// end
.place-container {
  background: #f0f0f4;
  padding: 0.08rem 0.28rem;
  font-size: 0.3rem;
  padding-bottom: 1.2rem;
  color: #555;
  .card {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 0.08rem;
    padding: 0.32rem 0.24rem;
    margin-top: 0.02rem;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .pick {
    display: flex;
    align-items: center;
    > span {
      margin-right: 0.16rem;
      font-size: 0.26rem;
      color: #999;
    }
    .font {
      font-size: 0.3rem;
      color: #0e3ace;
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.88rem;
    background: white;
    padding: 0.12rem 0.24rem;
    display: flex;
    .pre {
      color: white;
      text-align: center;
      flex: 1 1 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #0e3ace;
      border-radius: 999px;
    }
  }
}

.info {
  font-size: 0.26rem;
  color: #999;
  margin-left: 0.05rem;
}
.inp {
  display: flex;
  > span {
    width: 1.5rem;
  }

  .input {
    padding: 0.05rem;
    border: 1px solid transparent;
    &::placeholder {
      color: #ccc;
    }
  }
}
.nav {
  border-radius: 99px;
  margin-left: 8px;
  padding: 5px 12px;
  font-size: 12px;
  background: #44cef6;
  color: white;
}
</style>