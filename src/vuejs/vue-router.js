import Vue from 'vue'
import Router from 'vue-router'
import { Store } from '@/store/vue-store'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Setting from '@/views/Setting'
import User from '@/components/settings/User'
import UserForm from '@/components/settings/UserForm'
import Role from '@/components/settings/Role'
import Clients from '@/components/client/Clients'
import ClientForm from '@/components/client/ClientForm'
import ClientView from '@/components/client/ClientView'
import ClientProfile from '@/components/client/ClientProfile'
import ClientSessions from '@/components/client/ClientSessions'
import Sessions from '@/components/session/Sessions'
import SessionForm from '@/components/session/SessionForm'

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
            name: 'Clients',
            meta: { requiresAuth: true },
            components: { app: Clients },
            children: [
                {
                    path: 'profile/new',
                    name: 'ClientForm',
                    components: { clients: ClientForm }
                }
            ]
        },
        {
            path: '/client/:id',
            name: 'ClientView',
            meta: { requiresAuth: true },
            components: { app: ClientView },
            children: [
                {
                    path: 'profile',
                    name: 'ClientProfile',
                    components: { 'client-view': ClientProfile }
                },
                {
                    path: 'sessions',
                    name: 'ClientSessions',
                    components: { 'client-view': ClientSessions }
                }
            ]
        },
        {
            path: '/sessions',
            name: 'Sessions',
            meta: { requiresAuth: true },
            components: { app: Sessions },
            children: [
                {
                    path: 'profile/new',
                    name: 'SessionForm',
                    components: { sessions: SessionForm }
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
    Store.dispatch('CANCEL_PENDING_REQUESTS')
    const isAuthenticated = !!localStorage.getItem('_access_token')
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated)
        Store.dispatch('PERFORM_LOGOUT', 'sessionExpired')
    else
        next()
})

export default router
