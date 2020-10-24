export default {
    IS_AUTHENTICATED: function (state) {
        return state.isAuthenticated
    },
    GET_CANCEL_TOKEN_LIST: function (state) {
        return state.cancelTokenList
    },    
    GET_REFRESH_TOKEN: function (state) {
        return state.jwt.refreshToken
    },
    GET_ROUTE_PARAMS: function (state) {
        return state.routeParams
    },
    GET_CLIENT_LIST: function (state) {
        return state.filteredClientList
    },
    IS_CLIENT_ADDED: function (state) {
        return state.isClientAdded
    },
    GET_CLIENT_INFO: function (state) {
        return state.clientInfo
    }
}