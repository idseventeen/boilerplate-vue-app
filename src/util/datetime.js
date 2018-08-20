export const MONTH_TIME = 30 * 24 * 3600 * 1000
export const DAY_TIME = 24 * 3600 * 1000
export const HOURS_TIME = 3600 * 1000

/**
 * 获取格式化分时秒钟的毫秒数
 *
 * @param {string} time 根据分时秒格式(如: 12:11.300)，获取毫秒
 * @return {Number}
 */
export function getMilliseconds(time) {
  const reg = /(\d+):(\d+)(\.(\d+))*/g
  const ret = reg.exec(time)

  if (!ret) {
    return 0
  }

  const min = ret[1] || 0
  const sec = ret[2] || 0
  const mil = ret[4] || 0

  return parseInt(min, 10) * 60 * 1000 + parseInt(sec, 10) * 1000 + parseInt(mil, 10)
}

/**
 * 获取格式化分时秒钟的总秒数
 *
 * @param {string} time 根据分时秒格式(如: 12:11.300)，获取秒
 * @return {Number}
 */
export function getSeconds(time) {
  const mil = getMilliseconds(time)

  return mil / 1000
}

/**
 * 获取当前时间
 */
export function getNowTime() {
  return Date.now()
}

/**
 * 日期格式化方法
 * @param {string} date     [可选] 要格式化的时间
 * @param {string} fmt      [可选] 时间格式
 *
 * 月(M)、日(D)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(Q) ==> 可以用 1-2 个占位符
 * 年(Y) ==> 1-4 个占位符
 * 毫秒(S) ==> 1 个占位符(是 1-3 位的数字)
 */
export function formatDate(date = Date.now(), fmt = 'YYYY-MM-DD HH:mm:ss') {
  date = new Date(date)
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'h+': date.getHours() % 12 || 12, // 12小时
    'H+': date.getHours(), // 24小时
    'm+': date.getMinutes(), // 分钟
    's+': date.getSeconds(), // 秒
    'Q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  const week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  Object.keys(o).forEach(k => {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  })
  return fmt
}
