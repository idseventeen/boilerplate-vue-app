/**
 * 根据当前环境获取代理配置信息
 * @param {object} proxyMap 代理配置
 */
exports.getProxyConfig = proxyMap => {
  const proxy = {}

  // 对指定环境配置代理信息
  Object.keys(proxyMap).forEach(key => {
    proxy[`/${key}`] = {
      target: JSON.parse(proxyMap[key]),
      changeOrigin: true
    }
  })

  return proxy
}
