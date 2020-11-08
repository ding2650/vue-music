<template>
  <section class="place-container">
    <section class="card">
      <div class="item">
        <div>参观场所</div>
        <div class="gray">闸弄口站</div>
        <div style="display: flex; align-items: center">
          <van-icon
            name="location"
            color="#1a49c3"
            size="24"
            style="margin-right: 0.12rem"
          />
          导航
        </div>
      </div>
    </section>
    <!-- 预约数据 -->
    <section
      class="card"
      style="padding-bottom: 0.2rem"
      v-for="(item, i) in mocklist"
      :key="'m' + i"
    >
      <!-- <div> -->
      <p class="tit">{{ item.title }}</p>
      <div class="selects">
        <div
          class="foo"
          :class="s.active ? 'active' : ''"
          v-for="(s, index) in item.list"
          :key="'s' + index"
          @click="handlerClick(i, index)"
        >
          {{ s.value }}
        </div>
      </div>
      <!-- </div> -->
    </section>
    <!-- 预约人数 -->
    <section class="card" style="padding-bottom: 0.2rem">
      <div class="item">
        <span>预约人数</span>
        <section class="count">
          <span @click="handlerAddCount"></span>
          <span>{{ params.preCount }}</span>
          <span @click="handlerDecCount"></span>
        </section>
      </div>
    </section>

    <section class="card">
      <div>
        访客信息
        <span class="info">（需要填写{{ params.preCount }}个游客信息）</span>
      </div>
    </section>
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
      mocklist: [
        {
          title: "预约日期",
          list: [
            {
              value: "09-18",
              active: false,
            },
            {
              value: "09-19",
              active: false,
            },
            {
              value: "09-20",
              active: false,
            },
            {
              value: "更多",
              disableActive: true,
            },
          ],
        },
        {
          title: "选择场次",
          list: [
            {
              value: "09:00-12:00",
              active: false,
            },
            {
              value: "12:00-17:00",
              active: false,
            },
          ],
        },
        {
          title: "参观团体",
          list: [
            {
              value: "个人",
              active: false,
            },
            {
              value: "团体",
              active: false,
            },
            {
              value: "亲自",
              active: false,
            },
          ],
        },
      ],
      loading: false,
      params: {
        preCount: 0,
        preDate: "",
        preRank: "",
        preType: "",
      },
      peoples: [],
    };
  },
  computed: {
    forms() {
      return new Array(this.params.preCount);
    },
  },
  methods: {
    handlerPreBtnClick() {
      let flag = true;
      this.peoples.length = 0;
      for (let i = 0; i < this.params.preCount; i++) {
        const obj = {
          name: this.$refs.name[i].value,
          idCard: this.$refs.idCard[i].value,
          tel: this.$refs.tel[i].value,
        };
        this.peoples.push(obj);
      }
      flag = this.peoples.reduce((cur, nex) => {
        
        return cur && this.checkInfo(nex);
      }, true);
      if (!flag) {
        alert("请补充完整信息");
        return;
      }
      //   所有人身份信息
      console.log(this.peoples);
      this.params.preDate =
        this.mocklist[0].list.find((item) => item.active)?.value || null;
      this.params.preRank =
        this.mocklist[1].list.find((item) => item.active)?.value || null;
      this.params.preType =
        this.mocklist[2].list.find((item) => item.active)?.value || null;
      // 日期、场次、团队信息
      if (this.params.preDate && this.params.preRank && this.params.preType) {
        //   这里调预约接口
        // 信息放在this.params,身份信息在this.peoples里
        //... some code
        
        console.log(this.params);
        console.log(this.peoples);
      } else {
        alert("请填写完整信息");
      }
    },
    checkInfo (target) {
        // 对姓名，身份证，手机号校验
        return Object.values(target).every(item=>item)
    },
    handlerAddCount() {
      this.params.preCount++;
    },
    handlerDecCount() {
      this.params.preCount =
        this.params.preCount <= 0 ? 0 : this.params.preCount - 1;
    },
    handlerClick(i, index) {
      const target = this.mocklist[i].list;
      if (target[index].disableActive) {
        //   点击更多
      } else {
        target.forEach((item, m) => {
          item.active = m === index ? true : false;
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.place-container {
  background: #f0f0f4;
  padding: 0.08rem 0.28rem;
  font-size: 0.3rem;
  padding-bottom: 1.2rem;
  .card {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 0.08rem;
    padding: 0.32rem 0.24rem;
    margin-top: 0.15rem;
    box-shadow: 0 0 0.12rem 0.05rem #e9e9f0;
    .item {
      display: flex;
      justify-content: space-between;
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
.gray {
  color: #999;
}
.foo {
  padding: 0.08rem 0.32rem;
  border-radius: 999px;
  border: 1px solid #0e3ace;
  color: #0e3ace;
  margin-right: 0.18rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tit {
  margin-bottom: 0.12rem;
  font-size: 0.32rem;
}
.selects {
  display: flex;
  flex-wrap: wrap;
  .active {
    background: #0e3ace;
    color: white;
  }
}
.count {
  display: flex;
  align-items: center;
  font-size: 0.32rem;
  > span {
    margin-right: 0.18rem;
    width: 0.5rem;
    font-size: 0.42rem;
    height: 0.5rem;
    border: 1px solid #888;
    border-radius: 50%;
    &:nth-child(1) {
      background: url(../assets/imgs/add.svg) no-repeat;
      background-size: 80% 80%;
      background-position: 0.05rem 0.05rem;
    }
    &:nth-child(2) {
      transform: scale(1.36);
      width: auto;
      background: transparent;
      height: auto;
      border: none;
    }
    &:nth-child(3) {
      background: url(../assets/imgs/dec.svg) no-repeat;
      background-size: 80% 80%;
      background-position: 0.05rem 0.05rem;
    }
  }
}
.info {
  font-size: 0.28rem;
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
</style>