import Vue from 'vue'
import Router from 'vue-router'
import { Store } from '@/store/vue-store'
import Login from '@/views/Login'
import ForgotPassword from '@/views/ForgotPassword'
import Home from '@/views/Home'
import Setting from '@/views/Setting'
import User from '@/components/settings/User'
import UserForm from '@/components/settings/UserForm'
import Role from '@/components/settings/Role'
import Clients from '@/components/client/Clients'
import ClientForm from '@/components/client/ClientForm'
import ClientView from '@/components/client/ClientView'
import Sessions from '@/components/session/Sessions'
import SessionForm from '@/components/session/SessionForm'
import SessionView from '@/components/session/SessionView'
import Trainees from '@/components/trainee/Trainees'
import TraineeForm from '@/components/trainee/TraineeForm'
import TraineeView from '@/components/trainee/TraineeView'
import Leeds from '@/components/leed/Leeds'
import LeedForm from '@/components/leed/LeedForm'
import LeedView from '@/components/leed/LeedView'
import Billing from '@/components/accounts/Billing'
import InvoiceForm from '@/components/accounts/InvoiceForm'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            components: { app: Login }
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            components: { app: ForgotPassword }
        },
        {
            path: '/home',
            alias: '/',
            name: 'Home',
            meta: { requiresAuth: true },
            components: { app: Home }
        },
        {
            path: '/leeds',
            name: 'Leeds',
            meta: { requiresAuth: true },
            components: { app: Leeds },
            children: [
                {
                    path: 'profile/new',
                    name: 'AddLeed',
                    components: { 'leeds': LeedForm }
                },
                {
                    path: 'profile/edit',
                    name: 'EditLeed',
                    components: { 'leeds': LeedForm }
                }
            ]
        },
        {
            path: '/leed/:id',
            name: 'LeedView',
            meta: { requiresAuth: true },
            components: { app: LeedView }
        },
        {
            path: '/clients',
            name: 'Clients',
            meta: { requiresAuth: true },
            components: { app: Clients },
            children: [
                {
                    path: 'profile/new',
                    name: 'AddClient',
                    components: { 'clients': ClientForm }
                },
                {
                    path: 'profile/edit',
                    name: 'EditClient',
                    components: { 'clients': ClientForm }
                }
            ]
        },
        {
            path: '/client/:id',
            name: 'ClientView',
            meta: { requiresAuth: true },
            components: { app: ClientView }
        },
        {
            path: '/accounts',
            name: 'Accounts',
            meta: { requiresAuth: true },
            components: { app: Billing },
            children: [
                {
                    path: 'invoice/new',
                    name: 'NewInvoice',
                    components: { accounts: InvoiceForm }
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
                    name: 'AddSession',
                    components: { sessions: SessionForm }
                },
                {
                    path: 'profile/edit',
                    name: 'EditSession',
                    components: { sessions: SessionForm }
                }
            ]
        },
        {
            path: '/session/:id',
            name: 'SessionView',
            meta: { requiresAuth: true },
            components: { app: SessionView }
        },
        {
            path: '/trainees',
            name: 'Trainees',
            meta: { requiresAuth: true },
            components: { app: Trainees },
            children: [
                {
                    path: 'profile/new',
                    name: 'AddTrainee',
                    components: { 'trainees': TraineeForm }
                },
                {
                    path: 'profile/edit',
                    name: 'EditTrainee',
                    components: { 'trainees': TraineeForm }
                }
            ]
        },
        {
            path: '/trainee/:id',
            name: 'TraineeView',
            meta: { requiresAuth: true },
            components: { app: TraineeView }
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
                            path: 'add',
                            name: 'AddUser',
                            components: { user: UserForm }
                        },
                        {
                            path: 'edit',
                            name: 'EditUser',
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
        },
        { path: '/modal-box', name: 'ModalBox' }
    ],
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    Store.dispatch('CANCEL_PENDING_REQUESTS')
    const isAuthenticated = !!localStorage.getItem('_access_token')
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        Store.dispatch('PERFORM_LOGOUT', 'sessionExpired')
    } else if (to.name.match(/modal/i)) {
        Store.dispatch('OPEN_MODAL_BOX', true)
    } else {
        next()
    }
})

export default router
