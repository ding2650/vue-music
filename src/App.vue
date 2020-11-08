<template>
  <div id="app">
    <router-view />

    <!-- 固定底部歌曲播放器 -->
    <transition name="fade">
      <section class="fix-play" v-if="false">
        <div>
          <img class="img" :src="songInfo.imgUrl" alt="" />
        </div>
        <div class="info">
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
  computed: {
    ...mapState(["songInfo", "songsList"]),
  },
  mounted () {
    this.setSongInfo({audio:this.$refs.audio})
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
<style lang="scss" scoped>
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
    margin: 0 5vw;
    justify-content: space-around;
    p {
      margin: 0.05rem 0;
      &:last-child {
        color: #888;
      }
    }
  }
}
.fade-enter,
.fade-leave-to {
  transform: translateY(100%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.36s ease-in-out;
}
</style>
