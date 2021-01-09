<template>
  <section @touchstart='stop' @touchmove='stop' @click.stop="stop" class="loading" v-if="show" :class="mask?'mask':''">
    <ul class="center">
      <li class="line"></li>
      <li class="line"></li>
      <li class="line"></li>
      <li class="line"></li>
      <li class="msg">加载中...</li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      require: true,
    },
    mask:{
      type:Boolean,
      default:false
    }
    
  },
  methods:{
    stop(){},
  }
};
</script>

<style lang='scss'scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  // transform: translate(-50%,-50%);
  background: #fff;
  .center {
    display: flex;
    .msg{
      font-size: .32rem;
      color: #666;
    }
    .line {
      width: 0.10rem;
      height: 0.46rem;
      border-radius: 0.08rem;
      background: var(--color);
      margin-right: 0.15rem;
      animation: loading .8s infinite;
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
      &:nth-child(4) {
        animation-delay: 0.6s;
      }
    }
  }
}
@keyframes loading {
  0%{
    transform: scaleY(1.2);
    opacity: 1;
  }
  50% {
    transform: scaleY(.36);
    opacity: .66;
  }
  100%{
    opacity: 1;
    transform: scaleY(1.2);
  }
}
.mask{
  position: fixed;
  background: transparent;
}

</style>