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
        state.routeParams[`${params.key}`] = params.value
        localStorage.setItem('_route_params', JSON.stringify(state.routeParams))
    },
    SET_SELECTED_TAB: function (state, tab) {
        state.selectedTab = tab
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
        state.client.list = processList
    },
    SET_CLIENT_SELECT_LIST: function (state, clientSelectList) {
        state.client.selectList = clientSelectList.map(client => {
            return {
                key: client.clientName,
                value: client.id
            }
        })
    },
    SET_SESSION_SELECT_LIST: function (state, sessionSelectList) {
        state.session.selectList = sessionSelectList.map(session => {
            return {
                key: session.sessionName,
                value: session.id
            }
        })
    },
    DATA_MODIFIED: function (state, bool) {
        state.isDataModified = bool
    },
    SET_CLIENT_INFO: function (state, clientInfo) {
        state.client.info = clientInfo
        // localStorage.setItem('_client_info', JSON.stringify(clientInfo))
    },
    SET_SESSION_LIST: function (state, sessionList) {
        const processList = sessionList.map((ele, index) => {
            const newEle = {...ele, ...ele.client, ...ele.address}
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

        // localStorage.setItem('_session_info', JSON.stringify(sessionInfo))
    },
    SET_TRAINEE_LIST: function (state, traineeList) {
        const processList = traineeList.map((ele, index) => {
            const newEle = {...ele, ...ele.profile, ...ele.profile.address}
            newEle.sno = ++index
            delete newEle.profile
            return newEle
        })
        state.trainee.list = processList
    },
    SET_TRAINEE_INFO: function (state, traineeInfo) {
        // traineeInfo.clientId = traineeInfo.client.id
        state.trainee.info = traineeInfo
        // localStorage.setItem('_member_info', JSON.stringify(traineeInfo))
    }
}