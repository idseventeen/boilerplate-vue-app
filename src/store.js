import Vue from 'vue'
import Vuex from 'vuex'

// add modules and inject './store/modules/xxx'

import getters from './store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  getters
})
