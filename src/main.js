// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from '@/vuejs/vue-router'
import { Store } from '@/vuejs/vue-store.js'
import App from './App'
import fas from './vuejs/font-awesome'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router: Router,
  store: Store,
  render: h => h(App)
})
