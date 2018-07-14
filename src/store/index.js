import Vue from 'vue'
import Vuex from 'vuex'
import orders from './modules/orders'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  modules: {
    orders
  },
  strict: debug
})

export default store
