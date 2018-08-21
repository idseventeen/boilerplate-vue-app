const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { getProxyConfig } = require('./scripts/util')

const appEnv = process.env.APP_ENV || 'development'
const appConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, `./config/.env.${appEnv}.yaml`)))
const { proxyMap } = appConfig

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  // 相关配置信息
  // @see https://cli.vuejs.org/config/#devserver
  // @see https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    // 禁用主机检测
    // @see https://webpack.docschina.org/configuration/dev-server/#devserver-disablehostcheck
    disableHostCheck: true,
    port: 9527,
    ...(appEnv === 'mock' // Proxy API endpoints a local mock API.
      ? { before: require('./mock') }
      : appEnv === 'development' // Proxy API endpoints to the Proxy Map.
        ? { proxy: getProxyConfig(proxyMap) }
        : {})
  },
  chainWebpack(config) {
    // 定义全局变量及 APP 的配置信息
    // 由于cli3.0提供的环境变量不支持对象形式，故这里使用yaml来定义程序的环境变量数据
    config.plugin('define').tap(([constants]) => {
      const processEnv = constants['process.env']

      for (const key in appConfig) {
        processEnv[key] = JSON.stringify(appConfig[key])
      }

      constants['process.env'] = processEnv

      return [constants]
    })
  }
}
