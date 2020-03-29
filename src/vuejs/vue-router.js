import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Setting from '@/components/Setting.vue'
import User from '@/components/settings/User.vue'
import UserRegistration from '@/components/settings/UserRegistration.vue'
import Role from '@/components/settings/Role.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      components: {
        app: Login
      }
    },
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      components: {
        app: Home
      }
    },
    {
      path: '/settings',
      name: 'Setting',
      components: {
        app: Setting
      },
      children: [
        {
          path: 'users',
          name: 'User',
          components: {
            setting: User
          },
          children: [
            {
              path: 'new',
              name: 'UserRegistration',
              components: {
                user: UserRegistration
              }
            }
          ]
        },
        {
          path: 'roles',
          name: 'Role',
          components: {
            setting: Role
          }
        }
      ]
    }
  ],
  mode: 'history'
})
