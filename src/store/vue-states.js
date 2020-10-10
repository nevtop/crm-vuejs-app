export default {
    user: null,
    jwt: {
        accessToken: '',
        refreshToken: ''
    },
    isAuthenticated: false,
    cancelTokenList: [] ,
    configMap: new Map,
    clientList: [],
    isClientAdded: false,
    filteredClientList: []
}