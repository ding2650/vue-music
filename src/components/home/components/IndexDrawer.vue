<template>
  <transition name="fromLeft">
    
  </transition>
</template>

<script >
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {
    close() {
      this.show = false
    },
    open() {
      this.show = true
    },
  },
}
</script>

<style lang='scss' scoped>
    
   
.fromLeft-enter,
.fromLeft-leave-to{
    transform: translateX(-100%);
}

.fromLeft-enter-active,
.fromLeft-leave-active{
    transition: all .32s ease-in-out;
}
@keyframes fade{
    from {
        opacity: 0;
    }
}




</style>