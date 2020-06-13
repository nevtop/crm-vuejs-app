import Axios from 'axios'

export default {
    SET_AUTH_TOKEN: function (state, jwt) {
        state.jwt = jwt
        state.isAuthenticated = true
        localStorage.setItem('_auth_token', jwt)
        Axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
    },
    SET_USER_DATA: function (state, userData) {
        state.user = userData
        localStorage.setItem('_user', JSON.stringify(userData))
    },
    CLEAR_LOCAL_DATA: function (state) {
        localStorage.removeItem('_user')
        localStorage.removeItem('_auth_token')
        state.jwt = null
        state.isAuthenticated = false
        Axios.defaults.headers.common['Authorization'] = null
    }
}