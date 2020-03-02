import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import state from './states'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})

export default store