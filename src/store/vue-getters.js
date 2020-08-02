export default {
    IS_AUTHENTICATED: function (state) {
        return state.isAuthenticated
    },
    GET_CLIENT_LIST: function (state) {
        return state.filteredClientList
    }
}