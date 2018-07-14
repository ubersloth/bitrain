<template>
  <div id="app">
    <nav class="navbar navbar-light bg-dark sticky-top">
      <a href="/"><h1 class="navbar-brand text-light">Bitrain Pro</h1></a>
      <div v-show="this.isLoggedIn" class="my-2 my-lg-0 mr-3 text-light">
        Hi, {{ this.user }} | <a v-show="this.isLoggedIn" href="/" @click.prevent="logout">Sign out</a>
      </div>
    </nav>
    <div class="m-5">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import { DataTables } from 'vue-data-tables'
import { mapState, mapActions } from 'vuex'
import { capitalize } from '@/shared/tools'
import { INIT_STORE, LOGOUT } from '@/store/actions.type'

Vue.use(ElementUI, { locale })
Vue.use(DataTables)

export default {
  name: 'App',
  computed: mapState({
    isLoggedIn: (state) => state.authentication.isLoggedIn,
    user: (state) => capitalize(state.authentication.user)
  }),
  mounted () {
    if (!this.isLoggedIn) {
      this.$router.replace({ name: 'login' })
    }
  },
  watch: {
    isLoggedIn (val) {
      if (this.isLoggedIn) {
        this.$router.replace({ name: 'ec2' })
      } else {
        this.$router.replace({ name: 'login' })
      }
    }
  },
  methods: {
    ...mapActions({
      'logout': LOGOUT
    })
  },
  beforeCreate () {
    this.$store.dispatch(INIT_STORE)
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
