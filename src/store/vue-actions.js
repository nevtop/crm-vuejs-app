import Router from '@/vuejs/vue-router'
import { sendRequest } from '@/vuejs/vue-axios'

export default {
    AUTHENTICATE_USER: async function ({ commit }, credentials) {
        try {
            const config = {}
            config['_method'] = 'post'
            config['_url'] = '/user/login'
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
    } 
}