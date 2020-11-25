<template>
  <div id="app">
    <transition :name="animationStatus.name" :mode="animationStatus.mode">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>

    <!-- 固定底部歌曲播放器 -->
    <transition name="fade">
      <section class="fix-play" v-if="songInfo.fixShow">
        <div>
          <img  class="img" :src="songInfo.imgUrl" alt="" />
        </div>
        
        <div class="info" >
          <p>{{ songInfo.name }}</p>
          <p>{{ songInfo.artist }}</p>
        </div>
        
        <div style="margin: 0 2vw">
          <van-icon
            name="pause-circle-o"
            size="0.8rem"
            @click="play"
            v-if="!songInfo.isPlay"
          />
          <van-icon name="play-circle-o" size="0.8rem" v-else @click="pause" />
        </div>
        <div>
          <i class="iconfont icon-bofangliebiao" style="font-size: 0.8rem"></i>
        </div>
      </section>
    </transition>
    <audio :src="songInfo.playUrl" ref="audio"></audio>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["songInfo", "songsList", "animationStatus"]),
  },
  mounted() {
    this.setSongInfo({ audio: this.$refs.audio });
  },
  watch: {
    $route(to, from) {
      if (to.name === "Search") {
        this.mode = "in-out";
      }
      if (from.name === "Search") {
        this.mode = "out-in";
      }
    },
  },
  methods: {
    ...mapMutations(["setSongInfo"]),
    play() {
      this.setSongInfo({ isPlay: true });
    },
    pause() {
      this.setSongInfo({ isPlay: false });
    },
  },
};
</script>>
<style lang="scss" >
.fix-play {
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.2rem;
  display: flex;
  align-items: center;
  background: white;
  font-size: 0.28rem;
  padding: 0 2vw 0 5vw;
  box-shadow: 0 -2px 5px 1px #eee;
  .img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }
  .info {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 5vw;
    justify-content: space-around;
    p {
      margin: 0.05rem 0;
      width:calc(93vw - 3rem);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:last-child {
        color: #888;
       
      }
    }
  }
}
.in-enter {
  transform: translateX(100%) rotateZ(90deg);
}
.in-leave-to {
  transform: translateX(100%) rotateZ(90deg);
}
.out-enter {
  transform: translate(0, 0, 0);
}
.out-leave-to {
  transform: translateX(100%) rotateZ(90deg);
}

.in-enter-active,
.in-leave-active,
.out-leave-active {
  transition: all 0.42s ease-out;
  transform-origin: 100% 100%;
}
.fix {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  background: white;
}
</style>
