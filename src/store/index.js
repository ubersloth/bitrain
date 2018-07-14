import Vue from 'vue'
import Vuex from 'vuex'
import orders from './modules/orders'
import authentication from './modules/authentication'
import { INIT_STORE } from '@/store/actions.type'
import { LOGGED_IN } from '@/store/mutations.type'
import { consts } from '../shared/tools'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  actions: {
    [INIT_STORE] ({ commit }) {
      let auth = localStorage.getItem(consts.AUTH)
      if (auth) {
        commit(LOGGED_IN, JSON.parse(auth))
      }
    }
  },
  modules: {
    orders,
    authentication
  },
  strict: debug
})

export default store
