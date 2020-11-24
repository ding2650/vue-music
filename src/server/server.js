import axios from 'axios'
const BASEURL = 'http://dddlh.fun:3000'
const server = axios.create({
    baseURL: BASEURL,
    timeout: 120000
})

// 通过id获取歌曲播放地址
export const song = (params) => {
    return server.get('/song/url', { params })
}
// 通过id获取歌曲歌词
export const lyric = (params) => {
    return server.get('/lyric', { params })
}
// 通过id获取歌曲封面
// export const playOneSong = (params={id:33894312}) =>{
//     return server.get('/lyric',{params})
// }
// 通过id获取歌曲详情
export const songDetail = (params ) => {
    return server.get('/song/detail', { params })
}
export const album = (params ) => {
    return server.get('/album', { params })
}

// 轮播图
export const banners = () => {
    return server.get('/banner')
}
// 首页推荐歌单
export const recList = () => {
    return server.get('/personalized')
}
// 艺术家
export const artList = (params) => {
    return server.get('/artist/list', { params })
}
// 排行榜
export const rankList = (params) => {
    return server.get('/toplist/detail', { params })
}

// 搜索 热榜
export const hots = (params) => {
    return server.get('/search/hot', { params })
}
// 搜索关键词
export const placeHolder = (params) => {
    return server.get('/search/default', { params })
}

// 歌单列表
export const playList = (params) => {
    return server.get('playlist/detail', { params })
}


