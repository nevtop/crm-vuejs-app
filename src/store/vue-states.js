export default {
    user: null,
    jwt: {
        accessToken: '',
        refreshToken: ''
    },
    isAuthenticated: false,
    cancelTokenList: [],
    configMap: new Map,
    routeParams: {},
    isDataModified: false,
    selectedTab: null,
    client: {
        list: [],
        selectList: [],
        info: null
    },
    session: {
        list: [],
        info: null
    },
    member: {
        list: [],
        info: null
    }
}