/**
 * 对LocalStorage封装，支持数据过期
 *
 * @date 2018-08-20
 * @author Shen7<qi18226646281@gmail.com>
 */
import engine from 'store/src/store-engine'
import localstorage from 'store/storages/localStorage'

const plugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire')
]

const store = engine.createStore(localstorage, plugins)

export default store
