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
        selectList: [],
        info: null
    },
    trainee: {
        list: [],
        info: null
    },
    leed: {
        list: [],
        info: null
    }
}