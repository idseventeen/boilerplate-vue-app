const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { getProxyConfig } = require('./scripts/util')

const env = process.env.NODE_ENV || 'development'
const appConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, `./config/.env.${env}.yaml`)))
const { proxyMap } = appConfig

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    // 禁用主机检测
    // @see https://webpack.docschina.org/configuration/dev-server/#devserver-disablehostcheck
    disableHostCheck: true,
    port: 9527,
    // @see https://cli.vuejs.org/config/#devserver
    proxy: proxyMap ? getProxyConfig(proxyMap) : null
  },
  chainWebpack(config) {
    // 定义全局变量及 APP 的配置信息
    // 由于cli3.0提供的环境变量不支持对象形式，故这里使用yaml来定义程序的环境变量数据
    config.plugin('define').tap(([constants]) => {
      const processEnv = constants['process.env']
      Object.assign(processEnv, appConfig)

      return [Object.assign({}, constants, { 'process.env': processEnv })]
    })
  }
}
