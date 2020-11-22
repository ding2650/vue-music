<template>
  <section class="playList-container fix">
    <div class="header">
      <div class="bg">
        <img class="bg-img" :src="infos.coverImgUrl" alt="" />
      </div>
      <div class="content">
        <header>
          <Back style="transform: translateY(0.05rem)" />
          <h3>歌单</h3>
        </header>
        <section class="top-header">
          <section class="cover-img">
            <img class="full" :src="infos.coverImgUrl" alt="" />
            <span class="count">{{ formatCount(infos.playCount) }}</span>
          </section>
          <section class="right">
            <p class="title">{{ infos.name }}</p>
            <div class="author">
              <img class="img" :src="infos.creator.avatarUrl" alt="" />
              <span class="bar">
                {{ infos.creator.nickname }}
              </span>
            </div>
          </section>
        </section>
        <ul class="ul">
          <li class="li">
            <van-icon name="chat-o" size="22" />
            <span class="span"> 评论</span>
          </li>
          <li class="li">
            <van-icon name="like-o" size="22" />
            <span class="span"> 点赞</span>
          </li>
          <li class="li">
            <van-icon name="add-o" size="22" />
            <span class="span"> 收藏</span>
          </li>
          <li class="li">
            <van-icon name="ellipsis" class="rot" size="22" />
            <span class="span"> 更多</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="list"></div>
  </section>
</template>

<script>
import Back from "@com/common/Back";
import { formatCount } from "@tools/tools";
import { playList } from "@api/server";
export default {
  components: {
    Back,
  },
  data() {
    return {
      infos: {},
    };
  },
  methods: {
    getList() {
      playList({ id: this.$route.params.id }).then((res) => {
        console.log(res);
        this.infos = res.data.playlist;
      });
    },
    formatCount,
  },
  created() {
    console.log(111);
  },
  activated() {
    this.getList();
  },
};
</script>

<style lang='scss' scoped>
.playList-container{
  z-index: 9;
}
.rot {
  transform: rotate(90deg);
}
.header {
  position: relative;
  height: 5.68rem;
  .bg {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #999;
    .bg-img {
      filter: blur(0.52rem);
      width: 100%;
      height: 100%;
    }
  }
  .content {
    position: absolute;
    z-index: 9;
    width: 100%;
    header {
      padding: 0 0.24rem;
    }
    .ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.12rem 0.42rem;
      .li {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        font-size: 0.3rem;
        .span {
          margin-top: 0.08rem;
        }
      }
    }
  }
  header {
    // background: #ccc;
    display: flex;
    align-items: center;
    height: 1rem;
    color: white;
  }
  .right {
    display: flex;
    flex-direction: column;
    margin-left: 0.42rem;
    // padding: 0.24rem;
    flex: 1;
    color: white;
    overflow: hidden;
    justify-content: space-around;
    .author {
      display: flex;
      align-items: center;
      .bar {
        max-width: 75%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.3rem;
        color: #eee;
      }
      .img {
        width: 0.66rem;
        height: 0.66rem;
        border-radius: 50%;
        margin-right: 0.18rem;
      }
    }
    .title {
      font-size: 0.42rem;
      line-height: 1.5;
      display: -webkit-box;
      font-weight: 600;
      color: white;
      opacity: 0.9;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      margin-bottom: 0.12rem;
    }
  }
  .top-header {
    // background: lightcoral;
    padding: 0.36rem;
    display: flex;
    .cover-img {
      width: 2.56rem;
      height: 2.56rem;
      position: relative;
      border-radius: 0.12rem;
      overflow: hidden;
      // background: lightblue;
      .count {
        position: absolute;
        right: 2%;
        top: 2%;
        color: white;
      }
    }
  }
}
</style>