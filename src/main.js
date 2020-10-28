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
    const accessToken = localStorage.getItem('_access_token')
    if (accessToken) {
      this.$store.commit('SET_ACCESS_TOKEN', accessToken)
    }
    
    const refreshToken = localStorage.getItem('_refresh_token')
    if (refreshToken) {
      this.$store.commit('SET_REFRESH_TOKEN', refreshToken)
    }

    const routeParams = localStorage.getItem('_route_params')
    if (routeParams) {
      this.$store.commit('SET_ROUTE_PARAMS', JSON.parse(routeParams))
    }

    const clientInfo = localStorage.getItem('_client_info')
    if (clientInfo) {
      this.$store.commit('SET_CLIENT_INFO', JSON.parse(clientInfo))
    }

    Axios.interceptors.request.use((request) => {
      const source = Axios.CancelToken.source()
      request.cancelToken = source.token
      this.$store.commit('ADD_CANCEL_TOKEN', source)
      return request

    }, (error) => error)

    Axios.interceptors.response.use((response) => {
      this.$store.commit('REMOVE_REQUEST_CONFIG', response.config)
      return response
    }, (error) => {
      if (error.response.status === 435) {
        this.$store.dispatch('CANCEL_PENDING_REQUESTS')
        this.$store.dispatch('ISSUE_TOKEN')
      } else if (error.response.status === 440 || error.response.status === 445) {
        this.$store.dispatch('PERFORM_LOGOUT', 'sessionExpired')
      }
    })
  },
  render: h => h(App)
})
