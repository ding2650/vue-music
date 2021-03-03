// 数字转化成日期格式
export const formatMinutes = (num) => {
  let m = ~~(~~(num) / 60);
  let s = ~~(num) % 60;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return m + ":" + s;
};
// 数字格式化
export const formatCount = (count) => {
  return count < 10000
    ? count
    : count > 100000000
    ? ~~(count / 10000000) / 10 + " 亿"
    : ~~(count / 10000) + " 万";
};
