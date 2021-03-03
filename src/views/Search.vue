<template>
  <section class="search-container fix">
    <header class="header">
      <Back />
      <div class="mock-input">
        <input
          type="text"
          v-model="searchParams.keywords"
          @input="handlerInput"
          class="input"
          :placeholder="defaultMsg"
        />
      </div>
    </header>
    <!--  -->
    <main ref="bs" class="list">
      <div class="content">
        <ul>
          <li
            class="item"
            v-for="(item, i) in songsList"
            :key="i"
            @click="handlerPlay($event, item)"
          >
            <h5>{{ formatAuthor(item.name) }}</h5>
            <p>
              <span></span>
              <span>{{ item.artists[0].name }}</span>
              <span style="margin: 0 0.08rem">-</span>
              <span>{{ item.album.name }}</span>
            </p>
          </li>
        </ul>
        <div v-if="songsList.length" style="height: 1.28rem"></div>
      </div>
      <Loading :show="show" />
    </main>
    <section class="body" v-if="!songsList.length">
      <header>
        <h3>热搜榜</h3>
        <div class="play-all">
          <van-icon name="play" size="20" />
          播放全部
        </div>
      </header>
      <div>
        <ul class="hots">
          <li
            class="hot-item"
            :class="hot.className"
            v-for="(hot, i) in hotList"
            :key="'h' + i"
            @click="playSong(hot)"
          >
            <span>{{ i + 1 }}</span>
            <span>{{ hot.first }} </span>
            <span v-if="hot.haveTag" class="tag">HOT</span>
          </li>
        </ul>
      </div>
    </section>
    <Parabola ref="love" />
  </section>
</template>

<script>
import { hots, placeHolder, searchList } from '@api/server'
import Back from '@com/common/Back'
import BS from 'better-scroll'
import { mapMutations, mapState } from 'vuex'
import Loading from '../components/common/Loading.vue'
import Parabola from '../components/common/Parabola.vue'
export default {
  components: {
    Back,
    Loading,
    Parabola,
  },
  data() {
    return {
      show: false,
      searchParams: {
        keywords: '',
        // page: 1,
        // limit: 10,
      },
      timer: null,
      scroll: null,
      hotList: [],
      defaultMsg: '',
      songsList: [],
      classList: ['first', 'second', 'third'],
    }
  },
  computed: {
    ...mapState(['fixShow']),
  },

  activated() {
    this.getList()
    this.setAnimationStatus(false)
  },
  mounted() {
    this.scroll = new BS(this.$refs.bs, {
      click: true,
    })
  },
  methods: {
    ...mapMutations(['setAnimationStatus']),
    formatAuthor(str) {
      return str
    },
    handlerInput() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.searchList()
      }, 320)
    },
    handlerPlay(e, item) {
      this.$refs.love.open(e, {
        id: item.id,
        artist: item.artists[0].name,
        imgUrl: item.artists[0].img1v1Url,
        name: item.name,
      })
    },
    searchList() {
      if (!this.searchParams.keywords) {
        this.songsList = []
        return
      }
      this.show = true
      searchList(this.searchParams).then((res) => {
        this.songsList = res.data.result.songs
        this.$nextTick(() => {
          this.scroll.refresh()
          this.show = false
        })
      })
    },
    playSong(item) {
      this.searchParams.keywords = item.first
      this.searchList()
    },
    getList() {
      placeHolder().then((res) => {
        this.defaultMsg = res.data.data.showKeyword
      })
      hots().then((res) => {
        this.hotList = res.data.result.hots.map((k, i) => {
          return {
            ...k,
            className: this.classList[i] || '',
            haveTag: Math.random() <= 0.26 ? true : false,
          }
        })
      })
    },
  },
}
</script>

<style lang='scss'scoped>
.list{
  padding: .24rem;
  font-size: .28rem;
  position: absolute;
  top: .88rem;
  bottom: 0;
  left: 0;
  right: 0;
  h5{
    font-weight: 400;
    color:#000;
    font-size: .32rem;
  }
  .item{
    line-height: 1.52;
    padding:.12rem 0 ;
    >h5{
      width: 7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    }
  }
}
.body {
  padding: 0.24rem;
  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.18rem;
    border-bottom: 1px solid #eee;
    h3 {
      color: #000;
    }
    .play-all {
      display: flex;
      align-items: center;
      padding: 0.08rem 0.12rem;
      border: 1px solid #ddd;
      border-radius: 999px;
      color: #333;
    }
  }
}
.search-container {
  position: fixed;
  top: 0;
  width: 100%;
  font-size: 0.28rem;
  color: #666;
  z-index: 2;
  min-height: 100vh;
  background: white;

  .header {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    align-items: center;
    padding: 0.12rem;
    padding-bottom: 0.18rem;
    background: var(--color);
    .mock-input {
      padding: 0.12rem;
      justify-content: flex-start;
      flex: 1;
      display: flex;
      align-items: center;
      margin-right: 0.24rem;
      border-bottom: 0.03rem solid #fff;
      .input {
        border: none;
        caret-color: #fff;
        color: #fff;
        outline: none;
        background: transparent;
        &::placeholder {
          color: #fff;
          font-size: 0.26rem;
          text-indent: 0.12rem;
        }
      }
    }
  }
}
.hots {
  display: flex;
  margin-top: .15rem;
  flex-wrap: wrap;
  .hot-item {
    width: 48%;
    height: 0.66rem;
    line-height: 0.66rem;
    position: relative;
    display: inline-block;
    max-width: 3.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .tag{
      font-weight: 600;
      color: #ff2d51;
      font-style: italic;
      font-size: .24rem;
      margin-right: 0;
    }
    > span {
      margin-right: 0.18rem;
    }
    &:nth-child(2n + 1) {
      margin-right: 4%;
    }
  }
  .first,
  .second,
  .third {
    color: #000;
    font-weight: 600;
  }
  .first,.second,.third {
    > span {
      &:nth-child(1) {
        color: #ff2d51;
      }
    }
  }
  
}
</style>