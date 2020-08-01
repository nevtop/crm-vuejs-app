// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from '@/vuejs/vue-router'
import { Store } from '@/store/vue-store.js'
import Axios from 'axios'
import App from './App'
import fas from './vuejs/font-awesome'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router: Router,
  store: Store,
  created: function () {
    const authToken = localStorage.getItem('_auth_token')
    if(authToken)
      this.$store.commit('SET_AUTH_TOKEN', authToken)

    Axios.interceptors.response.use(response => response, error => {
      if(error.response.status === 440 || error.response.status === 445)
        this.$store.dispatch('PERFORM_LOGOUT', 'sessionExpired')
    })
  },
  render: h => h(App)
})
