<template>
  <div class="rec" ref="content">
    <div class="bs" ref="bs">
      <div class="vertical-line title">官方榜</div>
      <ul class="off-ranks">
        <li class="off-item" v-for="(item, i) in topRanks" :key="'t' + i">
          <div class="img-wrap">
            <img class="off-img" :src="item.coverImgUrl" alt="" />
            <span class="update-msg"> {{ item.updateFrequency }} </span>
          </div>
          <section class="off-info">
            <p class="song" v-for="(detail, i) in item.tracks" :key="'d' + i">
              {{ i + 1 }}、{{ detail.first }}-{{ detail.second }}
            </p>
          </section>
        </li>
      </ul>
      <!-- 剩余榜单 -->
      <div class="vertical-line title" style="margin-top: 0.18rem">全球榜</div>
      <div class="body"></div>
    </div>
  </div>
</template>

<script>
import BS from "better-scroll";
import { rankList } from "@api/server";
export default {
  name: "Rank",
  data() {
    return {
      scroll: null,
      topRanks: [],
      allRanks: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      rankList().then((res) => {
        this.topRanks = res.data.list.filter((k, i) => {
          return i <= 3;
        });
        this.allRanks = res.data.list.filter((m, n) => {
          return n > 3;
        });
        this.$nextTick(() => {
          this.initScroll();
        });
      });
    },
    initScroll() {
      this.scroll = new BS(this.$refs.content, {});
    },
  },
};
</script>

<style lang='scss' scoped>
.rec {
  width: 100%;
  height: 100%;
  overflow: scroll;
  .bs {
    background: var(--bg-color);
    padding: 0.08rem 0.16rem;
  }
}
.body {
  height: 800px;
}
.title {
  padding: 0.08rem 0;
  position: relative;
}
.song {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.off-item {
  box-shadow: 0 0 0.18rem 0.12rem #eee;
  background: white;
  border-radius: 0.08rem;
  display: flex;
  height: 1.98rem;
  padding: 0.12rem;
  .off-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #999;
    font-size: 0.26rem;
    width: calc(100% - 2.18rem);
  }
  .img-wrap {
    width: 1.98rem;
    flex-shrink: 0;
    border-radius: 0.08rem;
    overflow: hidden;
    position: relative;
    margin-right: 0.24rem;
    > img {
      width: 100%;
      height: 100%;
    }
    .update-msg {
      position: absolute;
      bottom: 0.15rem;
      left: 0.15rem;
      color: white;
      font-size: 0.24rem;
    }
  }
}
</style>