// 数字转化成日期格式
export const formatMinutes = num => {
    let m = parseInt(parseInt(num) / 60)
    let s = parseInt(num) % 60
    m = m < 10 ? ('0' + m) : m
    s = s < 10 ? ('0' + s) : s
    return m + ':' + s
}
// 格式化人数
export const formatCount = count => {
    return count < 10000
        ? count
        : count > 100000000
            ? parseInt(count / 10000000) / 10 + " 亿"
            : parseInt(count / 10000) + " 万";
}