/**
 *  created on 2017/8/31.
 *  author litao
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (var i in o) {
    if (new RegExp(`(${i})`).test(fmt)) {
      let str = o[i] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? padLeftZero(str) : str);
    }
  }
  return fmt;
};
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};
