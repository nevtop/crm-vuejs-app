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
        delete Axios.defaults.headers.common['Authorization']
    },
    ADD_REQUEST_CONFIG: function (state, config) {
        state.configList.push(config)
    },
    REMOVE_REQUEST_CONFIG: function (state, config) {
        const index = state.configList.map(item => item._url).indexOf(config.url)
        state.configList.splice(index, 1)
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
    }
}