import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { song, songDetail, lyric, album, getSongInfo } from "../server/server";
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
      fixShow: true,
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
    // 获取歌曲信息
    async getSong({ commit }, payload) {
      let res = await song(payload)
      commit('setSongInfo',{
        playUrl:res.data.data[0].url
      })
    },
    async songDetail({ commit }, payload) {
      const res = getSongInfo(payload)
      console.log(res)
    }
  },
  modules: {
  }
})
