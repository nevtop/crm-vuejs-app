import Axios from 'axios'
import getDefaultState from './vue-states'
import * as Util from '@/commonjs/util'

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
        localStorage.removeItem('_route_params')
        Object.assign(state, getDefaultState())
        state.isAuthenticated = false
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
    SET_MODAL_BOX: function (state, bool) {
        state.modalBox = bool
    },
    SET_CLIENT_LIST: function (state, clientList) {
        const processList = clientList.map((ele, index) => {
            const newEle = {...ele, ...ele.address}
            newEle.sno = ++index
            newEle.status = ele.active ? 'ACTIVE' : 'INACTIVE'
            newEle.onboardingDate = new Date(ele.onboardingDate).toLocaleDateString("en-GB")
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
    },
    SET_SESSION_LIST: function (state, sessionList) {
        const processList = sessionList.map((ele, index) => {
            const newEle = {...ele, ...ele.client, ...ele.address}
            newEle.sno = ++index
            newEle.status = ele.active ? 'RUNNING' : 'STOPPED'
            delete newEle.address
            return newEle
        })
        state.session.list = processList
    },
    SET_SESSION_INFO: function (state, sessionInfo) {
        sessionInfo.clientId = sessionInfo.client.id
        state.session.info = sessionInfo
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
        state.trainee.info = traineeInfo
    },
    SET_LEED_LIST: function (state, leedList) {
        leedList.forEach((ele, index) => {
            ele['sno'] = ++index
            ele['city'] = ele.address.city
            ele['state'] = ele.address.state
            delete ele.address
        })
        state.leed.list = leedList
    },
    SET_LEED_INFO: function (state, leedInfo) {
        leedInfo.leedTimelines.forEach((ele) => {
            ele['mode'] = 'VIEW'
            ele['createDate'] = new Date(ele.createDate).toLocaleDateString("en-GB")
            if (ele.scheduleDate) {
                const date = new Date(ele.scheduleDate)
                ele['timeValue'] = Util.getTimeValue(date.getTime())
            } else {
                ele['scheduleDate'] = new Date()
                ele['timeValue'] = '00:00'
            }
        })
        state.leed.info = leedInfo
    }
}