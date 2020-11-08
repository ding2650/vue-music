import axios from 'axios'
const BASEURL = 'http://dddlh.fun:3000'
const server = axios.create({
    baseURL:BASEURL,
    timeout:120000
})

// 通过id获取歌曲播放地址
export const song = (params={id:33894312}) =>{
    return server.get('/song/url',{params})
}
// 通过id获取歌曲歌词
export const lyric = (params={id:33894312}) =>{
    return server.get('/lyric',{params})
}
// 通过id获取歌曲封面
// export const playOneSong = (params={id:33894312}) =>{
//     return server.get('/lyric',{params})
// }
// 通过id获取歌曲详情
export const songDetail = (params={ids:33894312}) =>{
    return server.get('/song/detail',{params})
}
export const  album = (params={id:32311}) =>{
    return server.get('/album',{params})
}

// 轮播图
export const  banners = () =>{
    return server.get('/banner')
}
// 首页推荐歌单
export const  recList = () =>{
    return server.get('/personalized')
}
// 艺术家
export const  artList = (params) =>{
    return server.get('/artist/list',{params})
}
// 排行榜
export const  rankList = (params) =>{
    return server.get('/toplist/detail',{params})
}
