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
            console.error('Error Ocurred in API: AUTHENTICATE_USER')
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
    REGISTER_CLIENT: async function ({ dispatch }, clientData) {
        try {
            const config = {}
            config['_method'] = HttpMethod.POST
            config['_url'] = Url.REGISTER_CLIENT
            config['_data'] = clientData
            
            const { data } = await sendRequest(config)
            dispatch('FETCH_ALL_CLIENTS')
            Router.go(-1)
        } catch(err) { 
            console.error('Error Ocurred in API: REGISTER_CLIENT')
        }
    },
    FETCH_ALL_CLIENTS: async function ({ commit }) {
        try {
            const formData = new FormData()
            formData.set('fields', 'clientId,clientType,clientName,onboardingDate,address,city,state')

            const config = {}
            config['_method'] = HttpMethod.POST
            config['_url'] = Url.FETCH_ALL_CLIENTS
            config['_data'] = formData
            config['_headers'] = { 'Content-Type': 'multipart/form-data' }
            const { data } = await sendRequest(config)
            commit('SET_CLIENT_LIST', data.data)
            commit('FILTER_CLIENT_LIST', 0)
        } catch(err) {
            console.error('Error Ocurred in API: FETCH_ALL_CLIENTS')
        }
    }
}