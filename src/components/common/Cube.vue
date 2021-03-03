<template>
  <ul class="container" :style="rotStr" :class="show ? (full ? 'full' : '') : 'hide'">
    <li
      class="block"
      v-for="(item, i) in arr"
      :key="i"
      :class="classArr[i]"
      @touchstart="start"
      @touchmove.stop="move"
      @touchend="end"
    >
      <span v-if="full" class="name">{{ item.name }}</span>
      <img class="img" ref="img" :src="item.al.picUrl" alt="" />
    </li>
   
  </ul>
</template>

<script>
export default {
  props: {
    arr: {
      type: Array,
    },
  },
  data() {
    return {
      show: false,
      full: false,
      count: 0,
      rotating: true,
      timer: null,
      classArr: ['left', 'right', 'top', 'bottom', 'font', 'back'],
      initPoint: {
        x: 0,
        y: 0,
      },
      angle:{
        x:0,
        y:0,
        z:0,
      }
    }
  },
  computed:{
    rotStr(){
      let x = `rotateX(${this.angle.x}deg)`
      let y = `rotateY(${this.angle.y}deg)`
      let z = `rotateZ(${this.angle.z}deg);`
      let str = 'transform: ' + x +' ' + y + ' ' + z
      return   str
    }
  },
  activated() {
    console.log(1)
    this.$nextTick(() => {
      // let imgs = this.$refs.img
      let imgs = document.querySelectorAll('.container img')
      imgs.forEach((item) => {
        item.onload = (p) => {
          this.count++
          if (this.count === 6) {
            this.show = true
            this.creatAnimate()
          }
        }
      })
    })
  },
  methods: {
    creatAnimate() {
      if (!this.rotating) return
      this.angle.y += .5
      requestAnimationFrame(() => {
        this.creatAnimate()
      })
    },
    pauseAnimate(){
      this.rotating  = false
    },
    start() {
     
    },
    move(e) {},
    end() {
      this.full = !this.full
      return
      if(!this.full){
        this.full = true
        return
      }
      // this.rotating  = false
      console.log(this.rotating)

    },
  },
  mounted() {},
}
</script>

<style lang='scss' scoped>

@keyframes rot {
    0%{
    transform: rotateZ(0deg) rotateX(-0deg) rotateY(0deg);
    }
    100%{
    transform: rotateZ(0deg) rotateX(0deg) rotateY(360deg);

    }
    
}
.hide{
    opacity: 0;
}
.img{
    width: 100%;
    height: 100%;
}
.name{
  position: absolute;
  top: 0;
  right: .12rem;
  font-size:.28rem;
  padding: .1rem .24rem;
  border-radius: .12rem;
  color: #fff;
  background: rgba($color: #000000, $alpha:.32);
}
.container{
    position: fixed;
    width:1rem;
    height: 1rem;
    right: .52rem;
    top: .32rem;
    --len:.5rem;
    transform-style: preserve-3d;
    transition: all .32s ease-in-out;
    perspective: 5000px;
    // animation:  rot 10s linear infinite backwards;
    .block{
        position: absolute;
        transform-style: preserve-3d;
        perspective: 5000px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .font{
        transform: translateZ(var(--len)) ;
    }
    .back{
        transform: rotateY(180deg) translateZ(.5rem) ;
    }
    
    .left{
        transform: rotateY(90deg) translateZ(var(--len));
    }
    .right{
        transform: rotateY(-90deg) translateZ(var(--len));

    }
    .top{
        transform: rotateX(90deg) translateZ(var(--len));
    }
    .bottom{
        transform: rotateX(-90deg) translateZ(var(--len));


    }
}
.full{
  position: fixed;
  z-index: 999;
 width:4.2rem;
    height: 4.2rem;
    right: 20%;
    transform: translate(50%,-50%);
    top: 30%;
    --len:2.1rem;
    transform-style: preserve-3d;
    perspective: 5000px;
      .back{
        transform: rotateY(180deg) translateZ(2.1rem) ;

    }
}
</style>