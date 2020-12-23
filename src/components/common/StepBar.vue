<template>
  <section class="step-wrapper" :start="start" :pause="pause">
    <canvas id="bar" ref="bar" width="34" height="34"></canvas>
    <div class="block" @click="changeStatus">
      <img
        class="img1"
        v-if="isPlay"
        src="../../assets/imgs/pause.svg"
        alt=""
      />
      <img class="img2" v-else src="../../assets/imgs/play.svg" alt="" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      ctx: null,
      timer: null,
      isPlay: true,
      duration: 999,
    };
  },
  mounted() {
    this.ctx = this.$refs.bar.getContext("2d");
  },
  computed: {
    intervalTime() {
        console.log(this.duration)
      return this.duration * 10;
    },
  },
  methods: {
    changeStatus() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$emit("play");
      } else {
        this.$emit("pause");
      }
    },
    start(num) {
      this.duration = num;
      this.timer = setInterval(() => {
        if (this.percent === 100) {
          clearInterval(this.timer);
        }
        this.percent += 0.125;
        this.num++;
        this.draw();
      }, this.intervalTime / 8);
    },
    reset() {
      this.percent = 0;
    },
    draw() {
      this.$refs.bar.height = 34;
      this.ctx.moveTo(18, 18);
      this.ctx.arc(
        17,
        17,
        17,
        Math.PI * -0.5,
        (Math.PI * (this.percent - 50)) / 100,
        false
      );
      this.ctx.fillStyle = "#00aefd";
      this.ctx.fill();
    },
    pause() {
      clearInterval(this.timer);
    },
  },
};
</script>

<style lang='scss' scoped>
.step-wrapper {
  width: 34px;
  height: 34px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($color: #00aefd, $alpha: 0.42);
    border-radius: 50%;
    z-index: 1;
  }
  #bar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }
}

.block {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  background: #fff;
  transform: scale(0.82);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  > .img1 {
    transform: scale(0.68);
  }
  > .img2 {
    transform: scale(0.62);
  }
}
</style>