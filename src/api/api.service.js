import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LOGOUT } from '../store/actions.type'

const ApiService = {
  init (store) {
    this.$store = store
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = process.env.BASE_URL
  },

  errorHandler (error) {
    console.log(`ApiService ${error}`)
    if (error && error.response && error.response.status === 401) {
      this.$store.dispatch(LOGOUT)
    }
  },

  query (resource, params) {
    return Vue.axios
      .get(resource, { params: params })
      .catch(this.errorHandler.bind(this))
  },

  get (resource, id = '') {
    id = id ? '/' + id : id
    return Vue.axios
      .get(`${resource}${id}`)
      .catch(this.errorHandler.bind(this))
  }
}

export default ApiService

export const OrdersService = {
  query (payload) {
    return ApiService.query('listOrders', payload)
  }
}
