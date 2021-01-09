<template>
  <div id="app">
    <transition :name="animationStatus.name" :mode="animationStatus.mode">
      <keep-alive>
        <router-view @pause="pause" @continuePlay="continuePlay" />
      </keep-alive>
    </transition>

    <!-- 固定底部歌曲播放器 -->
    <transition name="fade">
      <section
        class="fix-play"
        :class="fixShow ? '' : 'hide'"
        @click="handerDetail"
      >
        <!-- <button @click="demo">btn</button> -->

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
        <!-- {{ songInfo.duration }} -->
        <div style="margin: 0 4vw 0 2vw" @click.stop="STOP">
          <StepBar ref="percentBar" @pause="pause" @play="continuePlay" >
          </StepBar>
        </div>
        <div>
          <i
            class="iconfont icon-bofangliebiao"
            style="font-size: 0.68rem; color: var(--color)"
          ></i>
        </div>
      </section>
    </transition>
    <audio
      :src="songInfo.playUrl"
      ref="audio"
      @canplay="handlerCanPlay"
      autoplay
    ></audio>
    <transition name="playing">
      <Play
        ref="play"
        @back="setFixShow"
        @pause="pause"
        @continuePlay="continuePlay"
        @updateTime="updateTime"
        @changeSpeed="changeSpeed"
      />
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Play from './views/Play'
import StepBar from './components/common/StepBar'
export default {
  components: {
    StepBar,
    Play,
  },
  data() {
    return {
      audio: {},
      timer: null,
    }
  },
  computed: {
    ...mapState(['songInfo', 'songsList', 'animationStatus', 'fixShow']),
  },
  mounted() {
    this.audio = this.$refs.audio
    this.audio.addEventListener('ended', () => {
      this.playNext()
    })
  },

  methods: {
    ...mapMutations([
      'setSongInfo',
      'playNext',
      'hideFixShow',
      'setFixShow',
      'setCurrentTime',
    ]),
    handlerCanPlay() {
      this.setSongInfo({ duration: this.audio.duration })
      this.audio.play()
      this.createRotateAnimation()
      this.$refs.percentBar.reset()
      this.$refs.percentBar.start(this.audio.duration)
      this.audio.addEventListener('timeupdate', () => {
        this.$refs.play.changeGcIndex(this.audio.currentTime)
        this.setCurrentTime(this.audio.currentTime)
      })
    },
    createRotateAnimation() {
      clearInterval(this.timer)
      this.setSongInfo({ angle: 0 })
      this.timer = setInterval(() => {
        this.setSongInfo({ angle: this.songInfo.angle + 0.36 })
      }, 16.7)
    },
    STOP() {},
    handerDetail() {
      this.$refs.play.open()
      this.hideFixShow()
    },
    changeSpeed(val) {
      this.audio.playbackRate = val
    },
    play() {
      this.$refs.percentBar.reset()
      this.createRotateAnimation()
      this.setSongInfo({ isPlay: true })
      // this.$refs.play.setPlayStatus()
      this.audio.play()
    },
    updateTime(val) {
      this.audio.currentTime = val
    },
    continuePlay() {
      this.setSongInfo({ idPlay: true })
      this.audio.play()
      this.$refs.percentBar.setPlayStatus()
      this.$refs.play.setPlayStatus()
      this.timer = setInterval(() => {
        this.setSongInfo({ angle: this.songInfo.angle + 0.36 })
      }, 16.7)
    },

    pause() {
      clearInterval(this.timer)
      this.$refs.percentBar.setPauseStatus()
      this.$refs.play.setPauseStatus()
      this.setSongInfo({ isPlay: false })
      this.audio.pause()
    },
  },
}
</script>>
<style lang="scss" >
.hide{
  transform: translateY(100%);
}
.fix-play {
  position: fixed;
  z-index: 88;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.2rem;
  display: flex;
  align-items: center;
  background: white;
  font-size: 0.28rem;
  padding: 0 5vw;
  transition: all .36s ease-in-out;
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
.playing-enter,
.playing-leave-to{
  transform: scale(0);
}
.playing-enter-active,
.playing-leave-active{
  transition: all .32s ease-in-out;
  transform-origin: left bottom;
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
.fade-enter{
  transform: translateY(100%);
}
.fade-leave-to{
  transform: translateY(100%);
}
.fade-enter-active,
.fade-leave-active{
  transition: all .32s ease-in-out;
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
