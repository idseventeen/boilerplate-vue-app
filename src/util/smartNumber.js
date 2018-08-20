/**
 * @public
 * 数字转换 保留小数位
 * @param {any} number              [必选] 要计算的数字
 * @param {number} [decimals=2]     [可选] 保留小数位数
 */
export function smartFloatNumber(number, decimals = 2) {
  number = `${number}`.replace(/[^0-9+-Ee.]/g, '')
  number = !isFinite(+number) ? 0 : +number
  decimals = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

/**
 * @public
 * 格式化数字
 * @param {number} number                 [必选] 要格式化的数字
 * @param {number} [decimals=2]           [必选] 保留几位小数
 * @param {string} [decimalSymbol='.']    [必选] 小数点符号
 * @param {string} [thousandsSymbol='']   [必选] 千分位符号
 * @param {string} [roundTag='ceil']      [必选] 舍入参数, ceil:向上取, floor:向下取, round:四舍五入
 */
export function formatNumber(number, decimals = 2, decimalSymbol = '.', thousandsSymbol = '', roundTag = 'ceil') {
  let fnumber = ''
  // 参数默认值
  number = `${number}`.replace(/[^0-9+-Ee.]/g, '')
  const _number = !isFinite(+number) ? 0 : +number
  const _decimals = !isFinite(+decimals) ? 0 : Math.abs(decimals)

  // 处理小数位
  const toFixedFix = (num, dec) => {
    const k = Math.pow(10, dec)
    return `${parseFloat(Math[roundTag](parseFloat((num * k).toFixed(dec * 2))).toFixed(dec * 2)) / k}`
  }

  fnumber = (_decimals ? toFixedFix(_number, _decimals) : '' + Math.round(_number)).split('.')
  // 处理千分位
  if (thousandsSymbol !== '') {
    const reg = /(-?\d+)(\d{3})/
    while (reg.test(fnumber[0])) {
      fnumber[0] = fnumber[0].replace(reg, `$1${thousandsSymbol}$2`)
    }
  }

  if ((fnumber[1] || '').length < _decimals) {
    fnumber[1] = fnumber[1] || ''
    fnumber[1] += new Array(_decimals - fnumber[1].length + 1).join('0')
  }
  return fnumber.join(decimalSymbol)
}
