<template>
  <section class="playList-container fix" ref="bs">
    <main >
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
                <img
                  class="img"
                  :src="infos.creator && infos.creator.avatarUrl"
                  alt=""
                />
                <span class="bar">
                  {{ infos.creator && infos.creator.nickname }}
                </span>
              </div>
            </section>
          </section>
          <ul class="ul" ref="content">
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
      <div class="list">
        <header class="header">
          <section class="list-left">
            <van-icon
              style="margin-right: 0.12rem"
              name="play-circle-o"
              size=".5rem"
            />
            播放全部<span class="span">(共{{list.length}}首)</span>
          </section>
          <section class="list-right">
            <van-icon name="plus" style="margin-right: 0.08rem" size=".36rem" />
            收藏 {{formatCount(infos.subscribedCount)}}
          </section>
        </header>
        <ul class="songs">
          <li class="songs-item" v-for="(item, i) in list" :key="i" @click="createAnimate($event,item,i)">
            <div class="order">{{ i + 1 }}</div>
            <div class="info">
              <p class="tit">{{ item.name }}</p>
              <p class="singer">
                {{ formatAuthor(item.ar) + "-" + item.al.name }}
              </p>
            </div>
          </li>
            <li style="height:.96rem"></li>

        </ul>
      </div>
    </main>
    <span class="song-animate" @animationend='show = false'  v-if="show" :style="`top:${top}px;left:${left}px`">
      <van-icon class="like" name="like" color="#f47983" size=".52rem"/>
    </span>
    
  </section>
</template>

<script>
import Back from "@com/common/Back";
import { formatCount } from "@tools/tools";
import { playList } from "@api/server";
import BS from "better-scroll";
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
  components: {
    Back,
  },

  data() {
    return {
      infos: {},
      list: [],
      scroll: null,
      show:false,
      top:0,
      left:0
    };
  },
  mounted(){
    this.initScoll()
  },
  computed:{
    ...mapState(['fixShow'])
  },
  methods: {
    ...mapActions(['getSong']),
    ...mapMutations(['setSongInfo','pushSong','setFixShow','setAnimationStatus']),
    
    createAnimate (e,{id},i) {
      // 设置动画
      this.top = e.clientY
      this.left = e.clientX
      this.show = true
      this.setSongInfo({
        imgUrl:this.list[i].al.picUrl,
        name:this.list[i].name,
        artist:this.formatAuthor(this.list[i].ar),
        isPlay:true,
        id
      })
      this.setFixShow()
      this.getSong({id})

    },
    initScoll() {
      this.scroll = new BS(this.$refs.bs, {
        click: true,
        bounce: {
          top:false,
        }
      });
    },
    formatAuthor(arr) {
      if (arr.length === 1) return arr[0].name;
      return arr.reduce((cur, nex, i) => {
        return cur + nex.name + (i === arr.length - 1 ? "" : " / ");
      }, "");
    },
    getList() {
      playList({ id: this.$route.params.id }).then((res) => {
        this.infos = res.data.playlist;
        this.list = res.data.playlist.tracks;
        this.$nextTick(()=>{
          this.scroll.refresh()
        })
      });
    },
    formatCount,
  },

  activated() {
    this.setAnimationStatus(false)
    this.getList();
  },
};
</script>

<style lang='scss' scoped>
.song-animate{
  position: fixed;
  // top: 50%;
  // right: 45%;
  z-index: 99;
  animation: hor 1s linear ;
}
main{
  min-height: 100vh;
}
.like{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  animation: via 1s  ease-in-out ;
}
@keyframes via {
  // 10%{
  //   transform: translateY(10px);
  // }
  // 20%{
  //   transform: translateY(-30px);
  // }
  100%{
    top:calc(100vh - 3rem );
  }
}
@keyframes hor {
  // 水平
  // 5%{
  //   transform: translateY(100%);
  // }
  // 20%{
  //   transform: translateX(0);
  // }
 
  100%{
    left:50%;
    transform: translateX(-50%);
  }
}
.tit {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100vw - 2rem);
}
.padding-bot{
  padding-bottom: .96rem;
}
.songs-item {
  display: flex;
  align-items: center;
  .order {
    padding: 0.52rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .singer {
      color: #999;
      margin-top: 0.05rem;
      font-size: 0.32rem;
      max-width: calc(100vw - 1.76rem);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.playList-container {
  z-index: 9;
  background: var(--bg);
  height: 100vh;
  overflow: hidden;
}
.list {
  border-radius: 0.28rem .28rem 0 0;
  background: white;
  transform: translateY(-0.28rem);
  // position: absolute;
  // width: 100%;
  // z-index: 99;
  .header {
    display: flex;
    align-items: center;
    height: 1rem;
    padding-left: 0.24rem;
    .list-left,
    .list-right {
      display: flex;
      align-items: center;
    }
    .list-left {
      flex: 0 0 55%;
      height: 100%;
      border-bottom: 1px solid #ccc;
      .span {
        margin-left: 0.12rem;
        color: #ccc;
        font-size: 0.32rem;
      }
    }
    .list-right {
      flex: 0 0 45%;
      background: var(--color);
      height: 100%;
      border-radius: 0.08rem;
      color: white;
      font-size: 0.34rem;
      justify-content: center;
    }
  }
}

.rot {
  transform: rotate(90deg);
}
.header {
  position: relative;
  height: 5.88rem;
  .bg {
    position: absolute;
    z-index: -1;
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