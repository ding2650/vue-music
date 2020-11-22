import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songInfo: {
      id: '',
      imgUrl: "",
      name: "",
      artist: "",
      gcIndex: 0,
      playUrl: "",
      duration: 0,
      currentTime: 0,
      isPlay: '',
      index: 0,
      fixShow: false,
    },
    animationStatus: {
      mode: 'in-out',
      name: 'in'
    },
    audio: {},
    songsList: []
  },
  mutations: {
    // 设置歌曲信息
    setSongInfo(state, payload) {
      state.songInfo = {
        ...state.songInfo,
        ...payload
      }
    },
    //设置歌曲对象的某些状态
    setAudioInfo(state, payload) {
      state.audio = {
        ...state.audio,
        ...payload
      }
    }
    // 操作当前播放列表
    // 增加
    // 删除
    // 清空
    // 
  },
  actions: {
  },
  modules: {
  }
})
