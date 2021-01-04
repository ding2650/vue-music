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
      gcList: [],
      playUrl: "",
      duration: 0,
      currentTime: 0,
      isPlay: false,
      index: 0,
      angle: 0,
      speed: 1,
    },
    curIndex: 0,
    fixShow: false,
    animationStatus: {
      mode: 'in-out',
      name: 'in'
    },
    audio: {},
    songsList: []
  },
  mutations: {
    setGCList(state, payload) {
      state.gcList = payload
    },
    // 设置歌曲信息
    setSongInfo(state, payload) {
      state.songInfo = payload.playUrl ? {
        ...state.songInfo,
        ...payload
      } : Object.assign(state.songInfo, payload)

    },
    setFixShow(state) {
      state.fixShow = true
    },
    hideFixShow(state) {
      state.fixShow = false
    },
    // 
    pushSongInfo(state) {

      console.log('push', state.songInfo.name)
      state.songsList.push({
        ...state.songInfo
      })
      state.curIndex = state.songsList.length - 1

    },
    updateSongList({ songsList, curIndex, songInfo }) {
      songsList[curIndex] = {
        ...songInfo
      }
    },

    // 播放结束下一首，
    playNext(state) {
      console.log(state.songsList.map(item => item.name))
      state.curIndex++
      state.curIndex = state.curIndex % state.songsList.length
      state.songInfo = state.songsList[state.curIndex]

    },
    // 操作当前播放列表
    // 增加
    // 删除
    // 清空
    // 
  },
  actions: {
    // 获取歌曲信息
    async getSong({ commit, dispatch, state }, payload) {
      const target = state.songsList.findIndex(item => {
        return item.id === payload.id
      })
      if (target !== -1) {
        commit('setSongInfo', {
          ...state.songsList[target]
        })
        return
      }
      commit('pushSongInfo')
      let res = await song(payload)
      commit('setSongInfo', {
        playUrl: res.data.data[0].url,
      })
      commit('updateSongList')
      // dispatch('songDetail', payload)

    },
    // async songDetail({ commit }, payload) {
    //   const res = await getSongInfo(payload)
    //   console.log(res)
    // }
  },
  modules: {
  }
})
