<template>
  <div class="home fix">
    <Setting ref='setting' />
    <header>
      <van-icon @click="openDrawer" name="wap-nav" size="26" />
      <span> Music </span>
      <span @click="linkSearch">
        <van-icon name="search" size="26" />
      </span>
    </header>
    <nav style="position: relative">
      <div
        v-for="(item, i) in navsArr"
        :key="i"
        :to="item.to"
        ref="navItem"
        class="nav-item"
        :class="activeIndex === i ? 'active' : ''"
        @click="toggle(item.to, i)"
      >
        {{ item.msg }}
      </div>
      <div class="line" ref="line">
        {{ navsArr[activeIndex].msg }}
      </div>
    </nav>
    <div class="home-container" @touchstart="start" @touchend="end">
      <keep-alive>
        <transition :name="deriction">
          <router-view class="type" ref="type" />
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
// import Banner from "@com/home/Banner";
import Setting from '../components/home/components/IndexDrawer'
import BS from 'better-scroll'
import { mapMutations, mapState } from 'vuex'
const LEFT = 'fromLeft'
const RIGHT = 'fromRight'
export default {
  name: 'Home',
  components: {
    Setting
  },
  data() {
    return {
      navsArr: [
        { msg: '推荐', to: '/home/rec' },
        { msg: '歌手', to: '/home/singer' },
        { msg: '排行榜', to: '/home/rank' },
      ],
      activeIndex: 0,
      timer: null,
      isFastSlid: true,
      fastTime: 200,
      initPoint: {
        x: 0,
        y: 0,
      },
      deriction: LEFT,
    }
  },
  computed: {
    ...mapState(['fixShow']),
  },
  activated() {
    this.setAnimationStatus(true)
    let index = this.getCurIndex()
    setTimeout(() => {
      this.setLine(index)
    }, 0)
  },
  methods: {
    ...mapMutations(['setAnimationStatus']),
    linkSearch(){
      this.setAnimationStatus(true)
      this.$router.push('/search')
    },
    openDrawer(){
      this.$refs.setting.open()
    },
    getCurIndex(){
      return this.navsArr.findIndex((item) => {
      return this.$route.path === item.to
    })
    },
    start(e) {
      let flag =  /stop/g.test(e.target.className)
      if(flag) return

      this.isFastSlid = true
      this.initPoint = {
        x: e.touches[0].screenX,
        y: e.touches[0].screenY,
      }
      this.timer = setTimeout(() => {
        this.timer = null
        this.isFastSlid = false
      }, this.fastTime)
    },
    linkToLeft() {
      console.log(1)
      let index = this.getCurIndex()
      let target = this.navsArr[index + 1] || this.navsArr[index]
      this.toggle(target.to, ++index)
    },
    linkToRight() {

      let index = this.getCurIndex()
      let target = this.navsArr[index - 1] || this.navsArr[index]
      this.toggle(target.to, --index)
    },
    end(e) {
      if (!this.isFastSlid || e.target.tagName==='SPAN') return
      let endPoint = e.changedTouches[0]
      let absX = this.initPoint.x - endPoint.screenX
      let absY = this.initPoint.y - endPoint.screenY
      let distance = Math.abs(absX) - Math.abs(absY)
      console.log(e)
      if (distance > 0) {
        if (absX > 0) {
          this.linkToLeft()
        } else {
          this.linkToRight()
        }
      } else {
        // console.log('垂直')
      }
      clearTimeout(this.timer)
    },
    // 横条left
    setLine() {
      let el = this.$refs.navItem[this.activeIndex]
      this.$refs.line.style.left = el.offsetLeft + 'px'
    },
    setDeriction() {
      let curIndex = this.getCurIndex()
      this.deriction = curIndex < this.activeIndex ? RIGHT : LEFT
    },
    toggle(to, i) {
      if (i === this.navsArr.length || i < 0) return
      this.activeIndex = i
      this.setLine()
      this.setDeriction(to)
      this.$router.push(to).catch(() => {})
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .home-container {
    position: absolute;
    background: linear-gradient(to Top,white 50%,var(--color) 50%);
    top: 2.1rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  header {
    background: var(--color);
    display: flex;
    padding: 0.24rem 0.32rem;
    font-size: 0.46rem;
    color: white;
    justify-content: space-between;
  }
  nav {
    background: var(--color);
    border-top: 0.01rem solid rgba(238, 238, 238, 0.479);
    font-size: 0.32rem;
    font-weight: 600;
    display: flex;
    justify-content: space-around;
    padding: 0.24rem 0;
    padding-bottom: 0.32rem;
    color: rgba(255, 255, 255, 0.881);
    .active {
      color: white;
    }
  }
  .line {
    position: absolute;
    bottom: 0.12rem;
    left: 0;
    height: 0.05rem;
    border-radius: 1px;
    transition: all 0.3s ease-in-out;
    transform: scaleX(1.5);
    transform-origin: 50% 50%;
    color: transparent;
    width: max-content;
    background: linear-gradient(to right, white, #eee);
  }
}

.fromLeft-enter,
.fromRight-leave-to{
  transform: translateX(-100%);
}
.fromRight-enter,
.fromLeft-leave-to{
  transform: translateX(100%);
}
.fromLeft-enter-active,
.fromRight-enter-active,
.fromLeft-leave-active,
.fromRight-leave-active{
  transition: all .32s ease-in-out;
}
</style>
