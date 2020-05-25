import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Setting from '@/views/Setting'
import User from '@/components/settings/User'
import UserForm from '@/components/settings/UserForm'
import Role from '@/components/settings/Role'

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
      path: '/home',
      alias: '/',
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
              name: 'UserForm',
              components: {
                user: UserForm
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
