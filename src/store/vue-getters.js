export default {
    IS_AUTHENTICATED: function (state) {
        return state.isAuthenticated
    },
    GET_REFRESH_TOKEN: function (state) {
        return state.jwt.refreshToken
    },
    GET_CLIENT_LIST: function (state) {
        return state.filteredClientList
    }
}