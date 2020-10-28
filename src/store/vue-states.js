export default {
    user: null,
    jwt: {
        accessToken: '',
        refreshToken: ''
    },
    isAuthenticated: false,
    cancelTokenList: [],
    configMap: new Map,
    routeParams: null,
    clientList: [],
    isDataAdded: false,
    filteredClientList: [],
    clientInfo: null
}