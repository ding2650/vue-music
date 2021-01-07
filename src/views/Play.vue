<template>
  <section :open="open" :hide="hide">
    <transition name="playing" appear>
      <div v-if="show" class="play-container">
        <img :src="songInfo.imgUrl" alt="" class="bg" />
        <header>
          <i class="back iconfont icon-xia" @click="back"></i>
          <section class="info">
            <p>{{ songInfo.name }}</p>
            <p>{{ songInfo.artist }}</p>
          </section>
        </header>
        <main>
          <section class="body">
            <div class="status" :class="isPlay ? '' : 'play'"></div>
            <div class="top" style="height: 80%">
              <div class="center">
                <img
                  class="img"
                  :src="songInfo.imgUrl"
                  :style="'transform:rotateZ(' + angle + 'deg)'"
                  alt=""
                />
              </div>
            </div>
            <!-- 歌词滚动 -->
            <section class="gc" ref="slider">
              <ul
                ref="slid"
                :style="`transform:translateY(${-translate * gcHeight}px)`"
                style="transition: all 0.5s ease-in-out"
              >
                <li
                  class="slid-item"
                  :style="'height:' + gcHeight + 'px'"
                  v-for="(item, i) in gcList"
                  :key="i"
                  :class="translate === i ? 'gcAct' : ''"
                  ref="gcItem"
                >
                  {{ item.msg }}
                </li>
              </ul>
            </section>
          </section>

          <section class="controls">
            <div class="v">
              倍速听歌
              <span
                class="speed-item"
                v-for="(item, i) in speed"
                :key="i"
                :class="speedIndex == i ? 'act' : ''"
                @click="changeSpeed(i)"
                >x{{ item }}</span
              >
            </div>
            <div class="line">
              <span class="nowtime">{{
                formatMinutes(songInfo.currentTime)
              }}</span>
              <van-slider
                :value="toInt(songInfo.currentTime)"
                bar-height=".1rem"
                :max="songInfo.duration"
                inactive-color="rgba(0,0,0,.36)"
                active-color="#ee0a24"
                @change="changeSongDuration"
              >
                <template #button>
                  <div class="slider-btn"></div>
                </template>
              </van-slider>
              <span class="alltime">{{
                formatMinutes(songInfo.duration)
              }}</span>
            </div>

            <div class="control">
              <i class="iconfont icon-danquxunhuan"></i>
              <i class="iconfont icon-previous"></i>
              <van-icon
                name="pause-circle-o"
                size="1rem"
                v-if="isPlay"
                @click="pause"
              />
              <van-icon name="play-circle-o" size="1rem" v-else @click="play" />
              <i class="iconfont icon-next-music"></i>
              <i class="iconfont icon-bofangliebiao"></i>
            </div>
          </section>
        </main>
      </div>
    </transition>
  </section>
</template>

<script>
import { formatMinutes } from '../tools/tools'
import { song, songDetail, lyric, album } from '../server/server'
import { mapMutations, mapState } from 'vuex'
export default {
  
  computed: {
    ...mapState(['songInfo']),
  },
  data() {
    return {
      speed: [0.75, 1, 1.25, 1.5, 2],
      show: false,
      speedIndex: 1,
      translate: 0,
      angle: 0,
      gcHeight: 0,
      gcList: [],
      isPlay: true,
      timer: null,
      slider: null,
    }
  },
  mounted() {
    this.createRotate()
  },
  methods: {
    createRotate() {
      this.timer = setInterval(() => {
        this.angle += 0.12
      }, 16.7)
    },
    open(id) {
      this.show = true
      this.init(id)
    },
    hide() {
      this.show = false
      this.$emit('back')
    },
    // 设置单个歌词的高度
    setHeight() {
      const parentHeight = parseInt(
        getComputedStyle(this.$refs.slider, null).height
      )
      this.gcHeight = parentHeight / 2
    },

    // 返回上一级
    back() {
      // this.$router.back()
      this.hide()
    },
    // 改变播放速度
    changeSpeed(i) {
      this.speedIndex = i
      this.$emit('changeSpeed',this.speed[i])
    },
    // 更改播放歌曲的当前时间
    changeSongDuration(val) {
      this.$emit('updateTime',val)
    },
    // 设置暂停状态
    setPauseStatus() {
      clearInterval(this.timer)
      this.timer = null
    },
    // 设置播放状态
    setPlayStatus() {
      this.timer = setInterval(() => {
        this.angle += 0.12
      }, 16.7)
    },
    // 暂停歌曲
    pause() {
      this.isPlay = false
      this.$emit('pause')
      this.setPauseStatus()
    },
    // 播放歌曲
    play() {
      this.isPlay = true
      this.$emit('continuePlay')
      this.setPlayStatus()
    },
    changeGcIndex(time) {
      let index = this.gcList.findIndex((item) => {
        return item.start > time
      })
      this.translate = index - 1
    },
    // 初始化数据
    init() {
      // 歌词
      lyric({
        id: this.songInfo.id,
      }).then((res) => {
        let arr1 = res.data.lrc.lyric.split(/\n/)
        let arr2 = arr1
          .map((item) => {
            let temp = item.split(']')
            let _arr = temp[0]
              .replace('[', '')
              .replace(/\.(.*)/, '')
              .split(':')
            let start = +_arr[0] * 60 + _arr[1] * 1
            let msg = temp[1]
            return {
              start,
              msg,
            }
          })
          .filter((item) => item.msg)
        let half = parseInt(arr2[0].start / 2)
        this.gcList = [
          { start: 0, msg: this.songInfo.name },
          { start: half, msg: this.songInfo.artist },
        ].concat(arr2)
        this.$nextTick(this.setHeight())
        // **
      })
    },
    // 工具函数和辅助函数
    ...mapMutations(['setSongInfo']),
    formatMinutes: formatMinutes,
    toInt(num) {
      return parseInt(num)
    },
  },
}
</script>

<style lang='scss' scoped>
.icon-zantingtingzhi {
  transform: scale(1.2) translateX(-0.12rem);
}

.gcAct {
  color:var(--color) !important;
}

.play-container {
  position: fixed;
  transform-origin: 0 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: #fff;
  display: flex;
  flex-direction: column;
  .bg {
    width: 100%;
    height: 100%;
    opacity: 0.88;
    filter: blur(30px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  header {
    height: 1.2rem;
    display: flex;
    align-items: center;
    border-bottom: 0.01rem solid #e2e2e248;
    .back {
      flex: 0;
      font-size: 0.52rem;
      margin: 0 0.12rem;
    }
    .info {
      flex: 1;
      font-size: 0.32rem;
    }
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .body {
      flex: 1;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      .status {
        position: absolute;
        top: -0.4rem;
        left: calc(50% - 0.56rem);
        width: calc(138px * 0.8);
        height: calc(207px * 0.8);
        transform-origin: 0.4rem 0.4rem;
        background: url(../assets/imgs/needle.png) no-repeat;
        background-size: 100%;
        z-index: 9;
        transform: rotateZ(-8deg);
        transition: all 0.3s ease-in-out;
      }
      .play {
        transform: rotateZ(-32deg);
      }
      .center {
        width: 70vw;
        height: 70vw;
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(../assets/imgs/bg-cycle.png);
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 68%;
          height: 68%;
          border-radius: 50%;
        }
      }
      .gc {
        font-size: 0.32rem;
        flex: 1;
        padding: 0 10vw;
        overflow: hidden;
        ul {
          li {
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            color: white;
            line-height: 2.5em;
          }
        }
      }
    }
    .controls {
      height: 24vh;
      padding: 0.2rem;
      .v {
        display: flex;
        font-size: 0.32rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0.2rem 5vw;
        color: #efeffec7;
        .speed-item {
          padding: 0.05rem 0.12rem;
          border: 0.01rem solid transparent;
          border-radius: 0.12rem;
        }
        .act {
          border-color: #ffa400;
        }
      }
      .line {
        padding: 0 5vw;
        padding-top: 0.2rem;
        display: flex;
        align-items: center;
        span {
          font-size: 0.32rem;
          margin: 0 0.28rem;
          &:last-child {
            margin-left: 0.12rem;
          }
        }
      }
      .control {
        display: flex;
        padding: 0.66rem 0;
        padding-bottom: 0;
        justify-content: space-around;
        .iconfont {
          font-size: 0.88rem;
          color: #333;
        }
      }
    }
  }
}
.slider-btn {
  border: 0.06rem solid white;
  background: #ee0a25d2;
  border-radius: 9rem;
  width: 0.2rem;
  height: 0.2rem;
}

</style>