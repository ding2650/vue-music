<template>
  <section class="rec" ref="content">
    <main class="bs" ref="bs">
      <Banner />
      <Loading :show='loading' />
      <section class="body" :style="hideSty">
        <h5 class="vertical-line">推荐歌单</h5>
        <ul class="items">
          <li class="item" v-for="(item, i) in recList" :key="'r' + i">
            <img class="img" ref="image" :src="item.picUrl" alt="" />
            <p class="desc">{{ item.name }}</p>
            <span class="count">{{ formatCount(item.playCount) }}</span>
          </li>
        </ul>
      </section>
    </main>
  </section>
</template>

<script>
import BS from "better-scroll";
import Swiper from "swiper";
import Banner from "./components/Banner";
import { recList } from "@api/server";
import Loading from '../common/Loading'
export default {
  name: "Rec",
  components: {
    Banner,
    Loading
  },
  data() {
    return {
      scroll: "",
      recList: [],
      loading: true,
      count: 0,
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.initScroll();
  },
  computed: {
    hideSty() {
      return `
      opacity:${this.loading ? 0 : 1}
            `;
    },
  },
  methods: {
    initScroll() {
      this.scroll = new BS(this.$refs.content, {});
    },
    getList() {
      recList().then((res) => {
        this.recList = res.data.result;
        this.$nextTick((item) => {
          this.$refs.image.forEach((item) => {
            item.onload = () => {
              this.count++;
              if (this.count === this.recList.length) {
                this.loading = false
              }
            };
          });
          this.scroll.refresh();
        });
      });
    },
    formatCount(num) {
      return num < 10000 ? num :num>100000000?parseInt((num / 10000000))/10  + '亿' :parseInt(num / 10000) + "万";
    },
  },
};
</script>

<style lang='scss' scoped>
.rec {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: var(--color);
  .bs {
    background: white;
  }
}

.body {
  padding: 0 0.12rem;
  color: #333;

  h5 {
    padding: 0.16rem 0;
    font-size: 0.32rem;
  }
  .items {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: calc((100% - 0.3rem) / 3);
    margin-right: 0.15rem;
    margin-bottom: 0.15rem;
    color: #666;
    font-size: 0.24rem;
    background: white;
    position: relative;
    border-radius: 0.08rem;
    box-shadow: 0 0 8px 2px #eee;
    padding-bottom: 0.12rem;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .img {
      width: 100%;
      min-height: calc((100vw - 0.54rem) / 3);
      display: block;
      margin: 0rem auto;
      height: auto;
      border-radius: 0.08rem 0.08rem 0 0;
      overflow: hidden;
      margin-bottom: 0.05rem;
      background: #888;
    }
    .desc {
      padding: 0 0.12rem;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .count {
      position: absolute;
      right: 0.08rem;
      top: 0.1rem;
      color: #eee;
    }
  }
}
</style>