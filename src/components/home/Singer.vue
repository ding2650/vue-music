<template>
  <section class="singer-container">
    <div class="types" ref="singerType">
      <section class="type-wrap">
        <span class="type-item"> 歌手分类： </span>
        <span
          class="type-item fade1"
          v-for="(item, i) in typeList"
          :key="'t' + i"
          :class="typeIndex === i ? 'active' : ''"
          :style="'--index:' + i"
          @click="handlerChangeTypeIndex(i)"
          @aninationend='refresh'
        >
          {{ item.label }}
        </span>
      </section>
    </div>
    <div class="types" ref="letters">
      <section class="type-wrap">
        <span class="type-item"> 首字母： </span>
        <span
          class="type-item fade2"
          v-for="(item, i) in letterList"
          :key="'t' + i"
          :class="letterIndex === i ? 'active' : ''"
          :style="'--index:' + i"
          @animationend='refresh'
          @click.stop="handlerChangeLetterIndex(i)"
        >
          {{ item.label }}
        </span>
      </section>
    </div>
    <div class="fix-singer" ref="content">
      <ul class="bs" ref="bs">
        <li class="card" v-for="(singer, i) in singerList" :key="'s' + i">
          <div class="avatar">
            <img :src="singer.picUrl" alt="" />
          </div>
          {{ singer.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import BS from 'better-scroll'
import { artList } from '@api/server'
export default {
  name: 'Rec',
  data() {
    return {
      scrollType: null,
      singerList: [],
      scrollLetter: null,
      typeIndex: -1,
      letterIndex: -1,
      requsetParams: {
        // 歌手类型
        type: '',
        area: '',
        // 首字母
        initial: '',
        // 偏移量
      },
      singerScroll: null,
      letterList: [
        {
          label: 'A',
          value: 'a',
        },
        {
          label: 'B',
          value: 'b',
        },
        {
          label: 'C',
          value: 'c',
        },
        {
          label: 'D',
          value: 'd',
        },
        {
          label: 'E',
          value: 'e',
        },
        {
          label: 'F',
          value: 'f',
        },
        {
          label: 'G',
          value: 'g',
        },
        {
          label: 'H',
          value: 'h',
        },
        {
          label: 'I',
          value: 'i',
        },
        {
          label: 'J',
          value: 'j',
        },
        {
          label: 'K',
          value: 'k',
        },
        {
          label: 'L',
          value: 'l',
        },
        {
          label: 'M',
          value: 'm',
        },
        {
          label: 'N',
          value: 'n',
        },
        {
          label: 'O',
          value: 'o',
        },
        {
          label: 'P',
          value: 'p',
        },
        {
          label: 'Q',
          value: 'q',
        },
        {
          label: 'R',
          value: 'r',
        },
        {
          label: 'S',
          value: 's',
        },
        {
          label: 'T',
          value: 't',
        },
        {
          label: 'U',
          value: 'u',
        },
        {
          label: 'V',
          value: 'v',
        },
        {
          label: 'W',
          value: 'w',
        },
        {
          label: 'X',
          value: 'x',
        },
        {
          label: 'Y',
          value: 'y',
        },
        {
          label: 'Z',
          value: 'z',
        },
      ],
      typeList: [
        {
          label: '华语男',
          value: {
            type: 1,
            area: 7,
          },
        },
        {
          label: '华语女',
          value: {
            type: 2,
            area: 7,
          },
        },
        {
          label: '华语组合',
          value: {
            type: 3,
            area: 7,
          },
        },
        {
          label: '欧美男',
          value: {
            type: 1,
            area: 96,
          },
        },
        {
          label: '欧美女',
          value: {
            type: 2,
            area: 96,
          },
        },
        {
          label: '欧美组合',
          value: {
            type: 3,
            area: 96,
          },
        },
        {
          label: '日本男',
          value: {
            type: 1,
            area: 8,
          },
        },
        {
          label: '日本女',
          value: {
            type: 2,
            area: 8,
          },
        },
        {
          label: '日本组合',
          value: {
            type: 3,
            area: 8,
          },
        },
        {
          label: '韩国男',
          value: {
            type: 1,
            area: 16,
          },
        },
        {
          label: '韩国女',
          value: {
            type: 2,
            area: 16,
          },
        },
        {
          label: '韩国组合',
          value: {
            type: 3,
            area: 16,
          },
        },
        {
          label: '其他男歌手',
          value: {
            type: 1,
            area: 0,
          },
        },
        {
          label: '其他女歌手',
          value: {
            type: 2,
            area: 0,
          },
        },
        {
          label: '其他组合',
          value: {
            type: 3,
            area: 0,
          },
        },
      ],
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.initScroll()
  },
  methods: {
    refresh(){
      this.scrollType.refresh()
      this.scrollLetter.refresh()
    },
    handlerChangeTypeIndex(i) {
      this.typeIndex = this.typeIndex === i ? -1 : i
      this.requsetParams =
        this.typeIndex === -1
          ? {
              ...this.requsetParams,
              type: '',
              area: '',
            }
          : {
              ...this.requsetParams,
              ...this.typeList[this.typeIndex].value,
            }
      this.getList()
    },
    handlerChangeLetterIndex(i) {
      console.log(i)
      this.letterIndex = this.letterIndex === i ? -1 : i
      this.requsetParams.initial =
        this.letterIndex === -1 ? '' : this.letterList[this.letterIndex].value
      this.getList()
    },
    initScroll() {
      this.scrollType = new BS(this.$refs.singerType, {
        scrollX: true,
        click: true,
      })
      this.scrollLetter = new BS(this.$refs.letters, {
        scrollX: true,
        click: true,
      })
    },
    //
    setSingerScroll() {
      this.singerScroll = new BS(this.$refs.content, {
        click: true,
      })
    },
    getList() {
      // loading
      artList(this.requsetParams).then((res) => {
        this.singerList = res.data.artists
        this.$nextTick(() => {
          this.setSingerScroll()
        })
      })
    },
  },
}
</script>

<style lang='scss' scoped>
.singer-container {
  padding: 0.08rem 0;
  background: var(--bg-color);
  z-index: 1;

  .types {
    width: 100vw;
    height: 0.42rem;
    margin-top: 0.08rem;
    line-height: 0.42rem;
    .type-wrap {
      width: max-content;
      font-size: 0.26rem;
      color: #666;
      display: flex;
      .type-item {
        margin-right: 0.12rem;
        width: max-content;
        border-radius: 0.08rem;
        padding: 0 0.08rem;
        border: 1px solid transparent;
        &:first-child {
          margin-right: 0;
          padding-left: 0.08rem;
        }
      }
      .active {
        background: var(--color);
        color: #eee;
      }
    }
  }
}
.fade1{
        animation: fromBottom .32s ease-in-out;
        animation-delay:calc(var(--index)* .1s) ;

}
.fade2{
        animation: _opacity .32s ease-in-out;
        animation-delay:calc(var(--index)* .1s) ;

}
@keyframes fromBottom{
  from{
    transform: translateY(.12rem);
  }
}
@keyframes _opacity{
  from{
    opacity: .32;
    transform: scale(.88);
  }
}
.fix-singer {
  position: fixed;
  top: 3.3rem;
  left: 0;
  right: 0;
  background: white;
  padding: 0.12rem;
  height: calc(100vh - 3.1rem);
  overflow: hidden;
  .bs {
    padding: 0.12rem 0;
    padding-bottom: 1.66rem;
  }
  .card {
    margin: 0 0.012rem;
    border-radius: 0.08rem;
    padding: 0.12rem;
    display: flex;
    align-items: center;
    color: #666;
    box-shadow: 0 0 0.15rem 0.05rem #eee;
    margin-bottom: 0.12rem;
    animation: toTop .32s ease-in-out;
    .avatar {
      width: 1.28rem;
      height: 1.28rem;
      border-radius: 0.08rem;
      overflow: hidden;
      margin-right: 0.24rem;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 0.08rem;
        overflow: hidden;
      }
    }
  }
}
// @keyframes toTop {
//   from{
//     transform: translateY(.24rem);
//   }
// }
</style>