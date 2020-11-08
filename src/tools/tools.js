// 数字转化成日期格式
export const formatMinutes = num => {
    let m = parseInt(parseInt(num) / 60)
    let s = parseInt(num) % 60
    m = m < 10 ? ('0' + m) : m
    s = s < 10 ? ('0' + s) : s
    return m  + ':' + s
}