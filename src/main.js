// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ApiService from './api/api.service'
import { formatMoney } from 'accounting'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.filter('formatMoney', formatMoney)
Vue.filter('formatDate', date => date.toLocaleString())

Vue.config.productionTip = false

ApiService.init(store)

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
