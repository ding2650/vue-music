<template>
  <section class="gc-container">
    <ul>
      <li
        class="slid-item"
        v-for="(item, i) in gcList"
        :key="i"
        :class="gcIndx === i ? 'gcAct' : ''"
        ref="gcItem"
      >
        {{ item.msg }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
    props:{
        gcList:{
            type:Array
        },
        speed:{
            type:Number,
            default:1
        }
    },
    updated () {
        this.init()
    },
    data () {
        return {
            timer:null
        }
    },
    methods: {
        init(){
            this.timer = setInterval(()=>{
                
            },100)
        }
    }
};
</script>

<style lang='scss' scoped>
.gc-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    ul{
        display: flex;
        flex-direction: column;
    }
  .gcAct {
    color: red;
  }
}
</style>