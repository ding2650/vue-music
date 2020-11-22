<template>
  <section class="search-container fix">
    <header class="header">
      <Back >
      
      </Back>
      <div class="mock-input">
        <input
          type="text"
          v-model="searchParams.q"
          @input="handlerInput"
          class="input"
          :placeholder="defaultMsg"
        />
      </div>
    </header>
    <!--  -->
    <section class="body">
      <header>
        <h3>热搜榜</h3>
        <div class="play-all">
          <van-icon name="play" size="20" />
          播放全部
        </div>
      </header>
      <div>
        <ul class="hots">
          <li
            class="hot-item"
            :class="hot.className"
            v-for="(hot, i) in hotList"
            :key="'h' + i"
          >
            <span>{{ i + 1 }}</span>
            <span>{{ hot.first }} </span>
            <span v-if="hot.haveTag" class="tag">HOT</span>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
import { hots,placeHolder } from "@api/server";
import Back from '@com/common/Back'
export default {
  components:{
    Back
  },
  data() {
    return {
      searchParams: {
        q: "",
        page: 1,
        limit: 10,
      },
      timer: null,
      hotList: [],
      defaultMsg:'',
      classList: ["first", "second", "third"],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handlerInput() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.searchList();
      }, 900);
    },
    searchList() {
      console.log("请求");
    },
    getList() {
      placeHolder().then(res=>{
        this.defaultMsg = res.data.data.showKeyword
      })
      hots().then((res) => {
        this.hotList = res.data.result.hots.map((k, i) => {
          return {
            ...k,
            className: this.classList[i] || "",
            haveTag:Math.random() <=0.26?true:false
          };
        });
      });
    },
  },
};
</script>

<style lang='scss'scoped>
.body {
  padding: 0.24rem;
  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.18rem;
    border-bottom: 1px solid #eee;
    h3 {
      color: #000;
    }
    .play-all {
      display: flex;
      align-items: center;
      padding: 0.08rem 0.12rem;
      border: 1px solid #ddd;
      border-radius: 999px;
      color: #333;
    }
  }
}
.search-container {
  position: fixed;
  top: 0;
  width: 100%;
  font-size: 0.28rem;
  color: #666;
  z-index: 2;
  min-height: 100vh;
  background: white;

  .header {
    display: flex;
    align-items: center;
    padding: 0.12rem;
    padding-bottom: 0.18rem;
    background: var(--color);
    .mock-input {
      padding: 0.12rem;
      justify-content: flex-start;
      flex: 1;
      display: flex;
      align-items: center;
      margin-right: 0.24rem;
      border-bottom: 0.03rem solid #fff;
      .input {
        border: none;
        caret-color: #fff;
        color: #fff;
        outline: none;
        background: transparent;
        &::placeholder {
          color: #fff;
          font-size: 0.26rem;
          text-indent: 0.12rem;
        }
      }
    }
  }
}
.hots {
  display: flex;
  margin-top: .15rem;
  flex-wrap: wrap;
  .hot-item {
    width: 48%;
    height: 0.66rem;
    line-height: 0.66rem;
    position: relative;
    .tag{
      font-weight: 600;
      color: #ff2d51;
      font-style: italic;
      font-size: .24rem;
    }
    > span {
      margin-right: 0.18rem;
    }
    &:nth-child(2n + 1) {
      margin-right: 4%;
    }
  }
  .first,
  .second,
  .third {
    color: #000;
    font-weight: 600;
  }
  .first,.second,.third {
    > span {
      &:nth-child(1) {
        color: #ff2d51;
      }
    }
  }
  
}
</style>