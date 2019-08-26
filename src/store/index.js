import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import Modules1 from './modules/modules1'
import Modules2 from './modules/modules2'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    Modules1,
    Modules2
  }

})
