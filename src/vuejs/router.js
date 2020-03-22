import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin.vue'
import Home from '@/components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Signin
    }
  ],
  mode: 'history'
})
