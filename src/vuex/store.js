import Vue from 'vue'
import Vuex from 'vuex'

// modules
import * as modules from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    getter: {
    },
    mutations: {
    },
    actions: {
    },
    modules : modules.default
})
