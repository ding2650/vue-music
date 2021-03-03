<template>
  <section class="back" @touchstart="back">
    <van-icon name="arrow-left" class="arrow" size="18" color="#fff" />
  </section>
</template>

<script>
export default {
  methods :{
    back () {
      this.$router.back()
    }
  }
};
</script>

<style lang='scss' scoped>
.arrow {
  margin-right: 0.26rem;
  transform: scale(1.5);
}
</style>