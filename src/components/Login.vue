<template>
  <div class="text-center row">
    <div class="col"></div>
    <form class="form-signin col-lg-3 mt-5" @submit.prevent="login({ user: user, password: password })">
      <img class="mb-4" :src="require('@/assets/cisco.gif')" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input type="text" class="form-control" placeholder="User" required autofocus v-model="user">
      <input type="password" class="form-control mb-4" placeholder="Password" required v-model="password">
      <div v-if="loginFailed" class="alert alert-info" role="alert">Login failed, wrong username or password?</div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">© 2018</p>
    </form>
    <div class="col" />
  </div>
</template>

<script>
import { LOGIN } from '@/store/actions.type'
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      user: '',
      password: ''
    }
  },
  computed: mapState({
    loginFailed: state => state.authentication.loginFailed
  }),
  methods: mapActions({
    login: LOGIN
  })
}
</script>
