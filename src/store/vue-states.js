export default {
    user: null,
    jwt: {
        accessToken: '',
        refreshToken: ''
    },
    isAuthenticated: false,
    cancelTokenList: [] ,
    configMap: new Map,
    routeParams: null,
    clientList: [],
    isClientAdded: false,
    filteredClientList: [],
    clientInfo: null
}