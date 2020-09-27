import Vue from 'vue'
import Router from 'vue-router'
import { Store } from '@/store/vue-store'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Setting from '@/views/Setting'
import User from '@/components/settings/User'
import UserForm from '@/components/settings/UserForm'
import Role from '@/components/settings/Role'
import Client from '@/components/Client'
import ClientForm from '@/components/ClientForm'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            components: { app: Login }
        },
        {
            path: '/home',
            alias: '/',
            name: 'Home',
            meta: { requiresAuth: true },
            components: { app: Home }
        },
        {
            path: '/clients',
            name: 'Client',
            meta: { requiresAuth: true },
            components: { app: Client },
            children: [
                {
                    path: 'new',
                    name: 'ClientForm',
                    components: { client: ClientForm }
                }
            ]
        },
        {
            path: '/settings',
            name: 'Setting',
            meta: { requiresAuth: true },
            components: { app: Setting },
            children: [
                {
                    path: 'users',
                    name: 'User',
                    components: { setting: User },
                    children: [
                        {
                            path: 'new',
                            name: 'UserForm',
                            components: { user: UserForm }
                        }
                    ]
                },
                {
                    path: 'roles',
                    name: 'Role',
                    components: { setting: Role }
                }
            ]
        }
    ],
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('_access_token')
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated)
        Store.dispatch('PERFORM_LOGOUT', 'sessionExpired')
    else
        next()
})

export default router
