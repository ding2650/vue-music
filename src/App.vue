<template>
  <div id="app">
    <transition :name="animationStatus.name" :mode="animationStatus.mode">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>

    <!-- 固定底部歌曲播放器 -->
    <transition name="fade">
      <section class="fix-play" v-if="fixShow">
        <button @click="demo">btn</button>

        <div>
          <img
            class="img"
            :src="songInfo.imgUrl"
            alt=""
            :style="`transform:rotate(${songInfo.angle}deg)`"
          />
        </div>

        <div class="info">
          <p>{{ songInfo.name }}</p>
          <p>{{ songInfo.artist }}</p>
        </div>
        <div></div>
        <div style="margin: 0 2vw">
          <van-icon
            name="pause-circle-o"
            size="0.8rem"
            @click="pause"
            v-if="songInfo.isPlay"
          />
          <van-icon name="play-circle-o" size="0.8rem" v-else @click="play" />
        </div>
        <div>
          <i class="iconfont icon-bofangliebiao" style="font-size: 0.8rem"></i>
        </div>
      </section>
    </transition>
    <audio
      :src="songInfo.playUrl"
      ref="audio"
      @canplay="handlerCanPlay"
      autoplay
    ></audio>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      audio: {},
      timer: null,
    };
  },
  computed: {
    ...mapState(["songInfo", "songsList", "animationStatus", "fixShow"]),
  },
  mounted() {
    this.audio = this.$refs.audio;
    this.audio.addEventListener("ended", () => {
      this.playNext();
    });
    this.audio.addEventListener("timeupdated", () => {
      // let index = this.gcList.findIndex((item) => {
      //   return item.start > this.audio.currentTime;
      // });
      // this.translate = index - 1;
    });
  },

  methods: {
    ...mapMutations(["setSongInfo", "playNext"]),
    demo() {
      this.playNext();
      this.createRotateAnimation()
    },
    handlerCanPlay() {
      this.setSongInfo({ duration: this.audio.duration });
      this.audio.play();
      this.createRotateAnimation();
    },
    createRotateAnimation() {
      clearInterval(this.timer);
      this.setSongInfo({ angle: 0 });
      this.timer = setInterval(() => {
        this.setSongInfo({ angle: this.songInfo.angle + 0.36 });
      }, 16.7);
    },
    handerDetail() {
      this.$router.push("/play");
    },
    play() {
      this.createRotateAnimation();
      this.setSongInfo({ isPlay: true });
      this.audio.play();
    },
    pause() {
      clearInterval(this.timer);
      this.setSongInfo({ isPlay: false });
      this.audio.pause();
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
      width: calc(93vw - 3rem);
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
.pad {
  padding-bottom: 1.15rem !important;
}
</style>
