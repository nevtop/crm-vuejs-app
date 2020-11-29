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
    GET_SELECTED_TAB: function (state) {
        return state.selectedTab
    },
    IS_DATA_MODIFIED: function (state) {
        return state.isDataModified
    },
    GET_CLIENT_LIST: function (state) {
        return state.client.list
    },
    GET_CLIENT_SELECT_LIST: function (state) {
        return state.client.selectList
    },
    GET_SESSION_SELECT_LIST: function (state) {
        return state.session.selectList
    },
    GET_CLIENT_INFO: function (state) {
        return state.client.info
    },
    GET_SESSION_LIST: function (state) {
        return state.session.list
    },
    GET_SESSION_INFO: function (state) {
        return state.session.info
    },
    GET_TRAINEE_LIST: function (state) {
        return state.trainee.list
    },
    GET_TRAINEE_INFO: function (state) {
        return state.trainee.info
    }
}