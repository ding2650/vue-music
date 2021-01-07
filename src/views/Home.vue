<template>
  <div class="home fix">
    <header>
      <van-icon name="wap-nav" size="26" />
      <span> Music </span>
      <router-link to="/search">
        <van-icon name="search" size="26" />
      </router-link>
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
    <div class="home-container" >
      <keep-alive>
        <!-- <transition :name="deriction" mode="in-out"> -->
          <router-view class="type" ref="type" />
        <!-- </transition> -->
      </keep-alive>
    </div>
  </div>
</template>

<script>
// import Banner from "@com/home/Banner";
import BS from "better-scroll";
import { mapState } from 'vuex';

export default {
  name: "Home",
  components: {},
  data() {
    return {
      navsArr: [
        { msg: "推荐", to: "/home/rec" },
        { msg: "歌手", to: "/home/singer" },
        { msg: "排行榜", to: "/home/rank" },
      ],
      activeIndex: 0,
      deriction: "fromLeft",
    };
  },
  computed :{
    ...mapState(['fixShow'])
  },
  mounted() {
    setTimeout(() => {
      this.setLine();
    }, 0);
  },
  methods: {
    // 横条left
    setLine() {
      let el = this.$refs.navItem[this.activeIndex];
      this.$refs.line.style.left = el.offsetLeft + "px";
    },
    toggle(to, i) {
      this.activeIndex = i;
      this.setLine();
      this.$router.push(to).catch(() => {});
    },
  },
};
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
    top: 2.08rem;
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


</style>
