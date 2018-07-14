import { LOGIN, LOGOUT } from '@/store/actions.type'
import { LOGGED_IN, LOGGED_OUT, LOGIN_FAILED } from '@/store/mutations.type'
import { pick } from 'lodash'
import { consts } from '../../shared/tools'

const state = {
  isLoggedIn: false,
  loginFailed: false,
  token: '',
  user: ''
}

const actions = {
  [LOGIN] ({ commit, state }, payload) {
    commit(LOGGED_OUT)
    if (payload.user.toLowerCase() === 'max' && payload.password === 'pazzword') {
      commit(LOGGED_IN, { ...payload, token: Number(new Date()) })
      localStorage.setItem(consts.AUTH, JSON.stringify(pick(state, ['user', 'token'])))
    } else {
      commit(LOGIN_FAILED)
    }
  },
  [LOGOUT] ({ commit, state }) {
    localStorage.removeItem(consts.AUTH)
    commit(LOGGED_OUT)
  }
}

const mutations = {
  [LOGGED_IN] (state, { token, user }) {
    state.token = token
    state.isLoggedIn = true
    state.user = user
  },
  [LOGGED_OUT] (state) {
    state.token = ''
    state.isLoggedIn = false
    state.user = ''
    state.loginFailed = false
  },
  [LOGIN_FAILED] (state) {
    state.loginFailed = true
  }
}

export default {
  state,
  actions,
  mutations
}
