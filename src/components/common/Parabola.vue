<template>
    <span
      class="song-animate"
      :open='open'
      @animationend="show = false"
      v-if="show"
      :style="`top:${top}px;left:${left}px`"
    >
      <van-icon class="like" name="like" color="#f47983" size=".52rem" />
    </span>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      show: false,
      top: 0,
      left: 0,
    }
  },
  methods: {
    ...mapActions(['getSong']),
    ...mapMutations(['setSongInfo', 'setFixShow']),
    open(e, obj) {
      this.top = e.clientY
      this.left = e.clientX
      this.show = true
      this.setSongInfo({
        imgUrl: obj.imgUrl,
        name: obj.name,
        artist: obj.artist,
        isPlay: true,
        id:obj.id,
      })
      this.setFixShow()
      this.getSong({ id: obj.id })
    },
  },
}
</script>

<style lang='scss' scoped>
.song-animate{
  position: fixed;
  // top: 50%;
  // right: 45%;
  z-index: 99;
  animation: hor 1s linear ;
}
@keyframes hor {
  // 水平
  // 5%{
  //   transform: translateY(100%);
  // }
  // 20%{
  //   transform: translateX(0);
  // }
 
  100%{
    left:50%;
    transform: translateX(-50%);
  }
}
.like{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  animation: via 1s  ease-in-out ;
}
@keyframes via {
  // 10%{
  //   transform: translateY(10px);
  // }
  // 20%{
  //   transform: translateY(-30px);
  // }
  100%{
    top:calc(100vh - 3rem );
  }
}
</style>