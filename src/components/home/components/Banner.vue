<template>
  <section class="bg">
    <section class="swiper-container stop"  ref="slider">
      <ul class="swiper-wrapper stop">
        <li class="swiper-slide stop" v-for="(img,i) in banners" :key="'b'+i">
            <img class="banner-img stop"  :src="img.imageUrl" alt="">
            <!-- tagetId跳转待续 -->
            </li>
      </ul>
    </section>
  </section>
</template>

<script>
import { banners } from "@api/server";
import Swiper from "swiper";
export default {
  data() {
    return {
      slider: null,
      banners:[]
    };
  },
  mounted() {
    this.getBanners();
  },
  methods: {
    getBanners() {
        banners()
        .then(res=>{
            this.banners = res.data.banners
            this.setSwiper()
        })
    },
    setSwiper() {
      this.slider = new Swiper(this.$refs.slider, {
        init:true,
        loop: true, // 循环模式选项
        speed: 400,
        slidesPerView: 1,
        autoplay: {
          delay: 2800,
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.swiper-container {
  height: 3.24rem;
  border-radius: 0.08rem;
  overflow: hidden;
}
.bg {
  background: linear-gradient(to bottom, #00aefd 42%, transparent 60%);
  padding: 0.12rem;
}
.banner-img{
    width: 100%;
    height: 100%;
}
</style>