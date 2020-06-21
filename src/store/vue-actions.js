import Router from '@/vuejs/vue-router'
import { sendRequest } from '@/vuejs/vue-axios'
import { HttpMethod, Url } from '@/commonjs/constants'

export default {
    AUTHENTICATE_USER: async function ({ commit }, credentials) {
        try {
            const config = {}
            config['_method'] = HttpMethod.POST
            config['_url'] = Url.AUTHENTICATE_USER
            config['_data'] = credentials
            
            const { data } = await sendRequest(config)
            commit('SET_AUTH_TOKEN', data.data[0].jwt)
            Router.push({name: 'Home'})
        } catch(err) {
            Router.push({name: 'Login', query: { invalidCredentials: true }})
        }
    },
    PERFORM_LOGOUT: function ({ commit }, queryString) {
        switch(queryString) {
            case 'logout':
                Router.push({ name: 'Login', query: { logout: true }})
                break;
            case 'sessionExpired':
                Router.push({name: 'Login', query: { sessionExpired: true }})
                break;
            default:
                Router.push({name: 'Login'})
        }
        commit('CLEAR_LOCAL_DATA')
    },
    REGISTER_CLIENT: async function (clientData) {
        try {
            const config = {}
            config['_method'] = HttpMethod.POST
            config['_url'] = Url.REGISTER_CLIENT
            config['_data'] = clientData
            
            const { data } = await sendRequest(config)
            Router.go(-1)
        } catch(err) { }
    },
    FETCH_CLIENTS: async function () {
        config['_method'] = HttpMethod.GET
        config['_url'] = Url.FETCH_CLIENTS
        return sendRequest(config)
    }
}