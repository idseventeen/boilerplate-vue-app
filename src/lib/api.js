/**
 * 服务端接口地址生成
 *
 * @date 2018-08-20
 * @author Shen7<qi18226646281@gmail.com>
 */
import parse from 'url-parse'
import config from '../config'

const apiMap = config.apiMap || {}

if (!apiMap) {
  throw new Error(`apiMap未配置，请在config/.env.${config.project.env}.js配置apiMap`)
}

/**
 * 根据微服务名称，pathname和params生成 api 地址
 *
 * @param {string} key 微服务地址映射
 * @param {string} pathname 接口路径
 * @param {any} args 接口参数
 */
export default (key, pathname = '', ...args) => {
  const parsed = parse(pathname)
  const params = args.length > 0 ? `${args.join('/')}` : ''

  return `${apiMap[key] || ''}${parsed.pathname}${params}`
}
