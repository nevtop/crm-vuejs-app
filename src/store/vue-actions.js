import Router from '@/vuejs/vue-router'
import { EventBus } from '@/vuejs/event-bus'
import { sendRequest } from '@/vuejs/vue-axios'
import { HttpMethod, Url } from '@/commonjs/constants'
import * as Util from '@/commonjs/util'

export default {
    AUTHENTICATE_USER: async function ({ commit }, credentials) {
        try {
            const config = Util.getConfig('AUTHENTICATE_USER', HttpMethod.POST, Url.AUTHENTICATE_USER,
                    credentials)
            const { data } = await sendRequest(config)
            commit('SET_ACCESS_TOKEN', data.data[0].accessToken)
            commit('SET_REFRESH_TOKEN', data.data[0].refreshToken)
            Router.push({name: 'Home'})
        } catch (err) {
            console.error('Error occurred in API: AUTHENTICATE_USER')
            Router.push({name: 'Login', query: { invalidCredentials: true }})
        }
    },
    ISSUE_TOKEN: async function ({ state, commit, dispatch }) {
        try {
            const refreshToken = state.jwt.refreshToken
            const config = Util.getConfig('ISSUE_TOKEN', HttpMethod.GET, Url.ISSUE_TOKEN, null, null,
                    { 'Authorization': `Bearer ${refreshToken}` })
            const { data } = await sendRequest(config)
            commit('SET_ACCESS_TOKEN', data.data[0].accessToken)
            commit('SET_REFRESH_TOKEN', data.data[0].refreshToken)
            dispatch('RESEND_REQUESTS')
        } catch (err) {
            console.error('Error occurred in API: ISSUE_TOKEN')
        }
    },
    RESEND_REQUESTS: async function ({ state, dispatch }) {
        try {
            state.configMap.forEach((config) => {
                dispatch(config._action, config._data)
            })
        } catch (err) {
            console.error('Error occurred in API: RESENT_REQUEST')
        }
    },
    CANCEL_PENDING_REQUESTS: function ({ state, commit }) {
        state.cancelTokenList.forEach((request) => {
            if (request.cancel) {
                request.cancel()
            }
        })
        commit('CLEAR_CANCEL_TOKEN_LIST')
    },
    PERFORM_LOGOUT: async function ({ commit }, queryString) {
        switch (queryString) {
            case 'logout':
                Router.push({ name: 'Login', query: { logout: true } })
                break;
            case 'sessionExpired':
                Router.push({ name: 'Login', query: { sessionExpired: true } })
                break;
            default:
                Router.push({ name: 'Login' })
        }
        EventBus.$emit('toggle-menu-icon', false)
        EventBus.$emit('toggle-side-nav', false)
        commit('CLEAR_LOCAL_DATA')
    },
    OPEN_MODAL: async function ({ commit }, modalbox) {
        console.log(modalbox)
    },
    REGISTER_CLIENT: async function ({ commit }, clientData) {
        try {
            const config = Util.getConfig('REGISTER_CLIENT', HttpMethod.POST, Url.REGISTER_CLIENT, clientData)
            const { data } = await sendRequest(config)
            commit('DATA_MODIFIED', true)
            Router.go(-1)
        } catch (err) { 
            console.error('Error occurred in API: REGISTER_CLIENT')
        }
    },
    UPDATE_CLIENT: async function ({ commit }, clientData) {
        try {
            const config = Util.getConfig('UPDATE_CLIENT', HttpMethod.PUT, Url.UPDATE_CLIENT, clientData)
            const { data } = await sendRequest(config)
            commit('DATA_MODIFIED', true)
            Router.go(-1)
        } catch (err) { 
            console.error('Error occurred in API: UPDATE_CLIENT')
        }
    },
    FETCH_ALL_CLIENTS: async function ({ commit }) {
        try {   
            // const formData = new FormData()
            // formData.set('fields', 'id,clientId,clientType,clientName,onboardingDate,address,city,state')
            // { 'Content-Type': 'multipart/form-data' }
            const config = Util.getConfig('FETCH_ALL_CLIENTS', HttpMethod.GET, Url.FETCH_ALL_CLIENTS)
            const { data } = await sendRequest(config)
            commit('SET_CLIENT_LIST', data.data)  
        } catch (err) {
            console.error('Error occurred in API: FETCH_ALL_CLIENTS')
        }
    },
    FETCH_CLIENT_SELECT_LIST: async function ({ commit }) {
        try {
            const config = Util.getConfig('FETCH_CLIENT_SELECT_LIST', HttpMethod.GET, 
                Url.FETCH_CLIENT_SELECT_LIST)
            const { data } = await sendRequest(config)
            commit('SET_CLIENT_SELECT_LIST', data.data)
        } catch (err) {
            console.error('Error occurred in API: FETCH_CLIENT_SELECT_LIST')
        }
    },
    FETCH_SESSION_SELECT_LIST: async function ({ commit }) {
        try {
            const config = Util.getConfig('FETCH_SESSION_SELECT_LIST', HttpMethod.GET, 
                Url.FETCH_SESSION_SELECT_LIST)
            const { data } = await sendRequest(config)
            commit('SET_SESSION_SELECT_LIST', data.data)
        } catch (err) {
            console.error('Error occurred in API: FETCH_SESSION_SELECT_LIST')
        }
    },
    RETRIEVE_CLIENT_INFO: async function ({ commit }, id) {
        try {
            const config = Util.getConfig('RETRIEVE_CLIENT_INFO', HttpMethod.GET, 
                Url.RETRIEVE_CLIENT_INFO.concat(`/${id}`))
            const { data } = await sendRequest(config)
            commit('SET_CLIENT_INFO', data.data[0])
            commit('SET_SESSION_LIST', data.data[0].sessions)
        } catch (err) {
            console.error('Error occurred in API: RETRIEVE_CLIENT_INFO')
        }
    },
    CREATE_SESSION: async function ({ commit }, sessionData) {
        try {
            const config = Util.getConfig('CREATE_SESSION', HttpMethod.POST, Url.CREATE_SESSION, sessionData)
            const { data } = await sendRequest(config)
            commit('DATA_MODIFIED', true)
            Router.go(-1)
        } catch (err) { 
            console.error('Error occurred in API: CREATE_SESSION')
        }
    },
    FETCH_ALL_SESSIONS: async function ({ commit }) {
        try {
            const config = Util.getConfig('FETCH_ALL_SESSIONS', HttpMethod.GET, Url.FETCH_ALL_SESSIONS)
            const { data } = await sendRequest(config)
            commit('SET_SESSION_LIST', data.data)
        } catch (err) {
            console.error('Error occurred in API: FETCH_ALL_SESSIONS')
        }
    },
    RETRIEVE_SESSION_INFO: async function ({ commit }, id) {
        try {
            const config = Util.getConfig('RETRIEVE_SESSION_INFO', HttpMethod.GET, 
                Url.RETRIEVE_SESSION_INFO.concat(`/${id}`))
            const { data } = await sendRequest(config)
            commit('SET_SESSION_INFO', data.data[0])

            const sessionTrainees = data.data[0].sessionTrainees.map(item => {
                return {
                    active: item.active,
                    ...item.trainee
                }
            })
            commit('SET_TRAINEE_LIST', sessionTrainees)
        } catch (err) {
            console.error('Error occurred in API: RETRIEVE_SESSION_INFO')
        }
    },
    UPDATE_SESSION: async function ({ commit }, sessionData) {
        try {
            const config = Util.getConfig('UPDATE_SESSION', HttpMethod.PUT, Url.UPDATE_SESSION, sessionData)
            const { data } = await sendRequest(config)
            commit('DATA_MODIFIED', true)
            Router.go(-1)
        } catch (err) {
            console.error('Error occurred in API: UPDATE_SESSION')
        }
    },
    REGISTER_TRAINEE: async function ({ commit }, traineeData) {
        try {
            const config = Util.getConfig('REGISTER_TRAINEE', HttpMethod.POST, Url.REGISTER_TRAINEE, traineeData)
            const { data } = await sendRequest(config)
            commit('DATA_MODIFIED', true)
            Router.go(-1)
        } catch (err) { 
            console.error('Error occurred in API: REGISTER_TRAINEE')
        }
    },
    UPDATE_TRAINEE: async function ({ commit }, traineeData) {
        try {
            const config = Util.getConfig('UPDATE_TRAINEE', HttpMethod.PUT, Url.UPDATE_TRAINEE, traineeData)
            const { data } = await sendRequest(config)
            commit('DATA_MODIFIED', true)
            Router.go(-1)
        } catch (err) { 
            console.error('Error occurred in API: UPDATE_TRAINEE')
        }
    },
    FETCH_ALL_TRAINEES: async function ({ commit }) {
        try {
            const config = Util.getConfig('FETCH_ALL_TRAINEES', HttpMethod.GET, Url.FETCH_ALL_TRAINEES)
            const { data } = await sendRequest(config)
            commit('SET_TRAINEE_LIST', data.data)
        } catch (err) {
            console.error('Error occurred in API: FETCH_ALL_TRAINEES')
        }
    },
    RETRIEVE_TRAINEE_INFO: async function ({ commit }, id) {
        try {
            const config = Util.getConfig('RETRIEVE_TRAINEE_INFO', HttpMethod.GET, 
                Url.RETRIEVE_TRAINEE_INFO.concat(`/${id}`))
            const { data } = await sendRequest(config)
            commit('SET_TRAINEE_INFO', data.data[0])
            const sessionTrainees = data.data[0].sessionTrainees.map(item => {
                return {
                    ...item.session,
                    active: item.active,
                }
            })
            commit('SET_SESSION_LIST', sessionTrainees)

        } catch (err) {
            console.error('Error occurred in API: RETRIEVE_TRAINEE_INFO')
        }
    },
    CREATE_LEED: async function ({ commit }, leedData) {
        try {
            const config = Util.getConfig('CREATE_LEED', HttpMethod.POST, Url.CREATE_LEED, leedData)
            const { data } = await sendRequest(config)
            commit('DATA_MODIFIED', true)
            Router.go(-1)
        } catch (err) { 
            console.error('Error occurred in API: CREATE_LEED')
        }
    },
    FETCH_ALL_LEEDS: async function ({ commit }) {
        try {
            const config = Util.getConfig('FETCH_ALL_LEEDS', HttpMethod.GET, Url.FETCH_ALL_LEEDS)
            const { data } = await sendRequest(config)
            commit('SET_LEED_LIST', data.data)
        } catch (err) {
            console.error('Error occurred in API: FETCH_ALL_LEEDS')
        }
    },
    RETRIEVE_LEED_INFO: async function ({ commit }, id) {
        try {
            const config = Util.getConfig('RETRIEVE_LEED_INFO', HttpMethod.GET, Url.RETRIEVE_LEED_INFO.concat(`/${id}`))
            const { data } = await sendRequest(config)
            commit('SET_LEED_INFO', data.data[0])
        } catch (err) {
            console.error('Error occurred in API: RETRIEVE_LEED_INFO')
        }
    },
    UPDATE_LEED: async function ({ commit }, leedData) {
        try {
            const config = Util.getConfig('UPDATE_LEED', HttpMethod.PUT, Url.UPDATE_LEED, leedData)
            const { data } = await sendRequest(config)
            commit('DATA_MODIFIED', true)
            Router.go(-1)
        } catch (err) {
            console.error('Error occurred in API: UPDATE_LEED')
        }
    }
}