import Axios from 'axios'

export default {
    SET_ACCESS_TOKEN: function (state, token) {
        state.jwt.accessToken = token
        state.isAuthenticated = true
        localStorage.setItem('_access_token', token)
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_REFRESH_TOKEN: function (state, token) {
        state.jwt.refreshToken = token
        localStorage.setItem('_refresh_token', token)
    },
    SET_USER_DATA: function (state, userData) {
        state.user = userData
        localStorage.setItem('_user', JSON.stringify(userData))
    },
    CLEAR_LOCAL_DATA: function (state) {
        localStorage.removeItem('_user')
        localStorage.removeItem('_access_token')
        localStorage.removeItem('_refresh_token')
        state.jwt.accessToken = null
        state.jwt.refreshToken = null
        state.isAuthenticated = false
        state.configMap.clear()
        delete Axios.defaults.headers.common['Authorization']
    },
    ADD_REQUEST_CONFIG: function (state, config) {
        state.configMap.set(config._url, config)
    },
    REMOVE_REQUEST_CONFIG: function (state, config) {
        state.configMap.delete(config.url)
    },
    ADD_CANCEL_TOKEN: function (state, token) {
        state.cancelTokenList.push(token)
    },
    CLEAR_CANCEL_TOKEN_LIST: function (state) {
        state.cancelTokenList = []
    },
    SET_ROUTE_PARAMS: function (state, params) {
        state.routeParams = params
        localStorage.setItem('_route_params', JSON.stringify(params))
    },
    SET_CLIENT_LIST: function (state, clientList) {
        const processList = clientList.map((ele, index) => {
            const newEle = {...ele, ...ele.address}
            newEle.sno = ++index
            newEle.onboardingDate = new Intl.DateTimeFormat('en-GB')
                .format(new Date(ele.onboardingDate))
            delete newEle.address
            return newEle
        })
        state.clientList = processList
    },
    NEW_DATA_ADDED: function (state, bool) {
        state.isDataAdded = bool
    },
    FILTER_CLIENT_LIST: function (state, tabIndex) {
        if (tabIndex == 0)
            state.filteredClientList = state.clientList.filter(ele =>
                ele.clientType == 'CORPORATE' || ele.clientType == 'PERSONAL'
            ).map((ele, index) => {
                ele.sno = ++index
                return ele
            })
        else if (tabIndex == 1)
            state.filteredClientList = state.clientList.filter(ele => 
                ele.clientType == 'PERSONAL'
            ).map((ele, index) => {
                ele.sno = ++index
                return ele
            })
        else if (tabIndex == 2)
            state.filteredClientList = state.clientList.filter(ele => 
                ele.clientType == 'CORPORATE'
            ).map((ele, index) => {
                ele.sno = ++index
                return ele
            })
    },
    SET_CLIENT_INFO: function (state, clientInfo) {
        state.clientInfo = clientInfo
        localStorage.setItem('_client_info', JSON.stringify(clientInfo))
    },
    SET_SESSION_LIST: function (state, sessionList) {
        const processList = sessionList.map((ele, index) => {
            const newEle = {...ele, ...ele.address}
            newEle.sno = ++index
            if (ele.active === true) {
                newEle.status = 'RUNNING'
            } else {
                newEle.status = 'STOPPED'
            }
            delete newEle.address
            delete newEle.active
            return newEle
        })
        state.session.list = processList
    },
    SET_SESSION_INFO: function (state, sessionInfo) {
        sessionInfo.clientId = sessionInfo.client.id
        state.session.info = sessionInfo
        localStorage.setItem('_session_info', JSON.stringify(sessionInfo))
    }
}