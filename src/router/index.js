import Vue from 'vue'
import Router from 'vue-router'
import Market from '@/components/Market'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ec2',
      component: Market
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
