import Router from '@/vuejs/vue-router'
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
    ISSUE_TOKEN: async function ({ state, commit, dispatch}) {
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
    REGISTER_CLIENT: async function ({ commit }, clientData) {
        try {
            const config = Util.getConfig('REGISTER_CLIENT', HttpMethod.POST, Url.REGISTER_CLIENT, clientData)
            const { data } = await sendRequest(config)
            commit('NEW_CLIENT_ADDED', true)
            Router.go(-1)
        } catch (err) { 
            console.error('Error occurred in API: REGISTER_CLIENT')
        }
    },
    FETCH_ALL_CLIENTS: async function ({ commit }) {
        try {
            const formData = new FormData()
            formData.set('fields', 'id,clientId,clientType,clientName,onboardingDate,address,city,state')

            const config = Util.getConfig('FETCH_ALL_CLIENTS', HttpMethod.POST, Url.FETCH_ALL_CLIENTS,
                    formData, null, { 'Content-Type': 'multipart/form-data' })
            const { data } = await sendRequest(config)
            commit('SET_CLIENT_LIST', data.data)
            commit('FILTER_CLIENT_LIST', 0)
        } catch (err) {
            console.error('Error occurred in API: FETCH_ALL_CLIENTS')
        }
    },
    RETRIEVE_CLIENT_INFO: async function ({ commit }, id) {
        try {
            const config = Util.getConfig('RETRIEVE_CLIENT_INFO', HttpMethod.GET, Url.RETRIEVE_CLIENT_INFO.concat(`/${id}`),
                    null, null)
            const { data } = await sendRequest(config)
            commit('SET_CLIENT_INFO', data.data[0])
        } catch (err) {
            console.error('Error occurred in API: RETRIEVE_CLIENT_INFO')
        }
    }
}