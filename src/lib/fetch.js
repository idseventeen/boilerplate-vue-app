import axios from 'axios'
import config from '../config'

// 创建axios实例
const fetch = axios.create({
  timeout: config.fetchTimeout // 请求超时时间
})

// request 拦截器
fetch.interceptors.request.use(
  options => {
    if (!options.method) {
      options.method = 'get'
    }

    return options
  },
  error => {
    // Do something with request error
    // request error code
    console.error('Fetch Request Handler Error Message:', error)
    return Promise.reject(error)
  }
)

// response 拦截器
fetch.interceptors.response.use(
  response => response.data,
  error => {
    console.error('Fetch Response Handler Error Message:', error)
    return Promise.reject(error)
  }
)

export default fetch
