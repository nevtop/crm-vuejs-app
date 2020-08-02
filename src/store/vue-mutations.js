import Axios from 'axios'

export default {
    SET_AUTH_TOKEN: function (state, jwt) {
        state.jwt = jwt
        state.isAuthenticated = true
        localStorage.setItem('_auth_token', jwt)
        Axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
    },
    SET_USER_DATA: function (state, userData) {
        state.user = userData
        localStorage.setItem('_user', JSON.stringify(userData))
    },
    CLEAR_LOCAL_DATA: function (state) {
        localStorage.removeItem('_user')
        localStorage.removeItem('_auth_token')
        state.jwt = null
        state.isAuthenticated = false
        Axios.defaults.headers.common['Authorization'] = null
    },
    SET_CLIENT_LIST: function (state, clientList) {
        const processList = clientList.map((ele, index) => {
            ele.sno = ++index
            ele.city = ele.address.city
            ele.state = ele.address.state
            ele.onboardingDate = new Intl.DateTimeFormat('en-GB')
                .format(new Date(ele.onboardingDate))
            delete ele.address
            return ele
        })
        state.clientList = processList
    },
    FILTER_CLIENT_LIST: function (state, tabIndex) {
        if(tabIndex == 0)
            state.filteredClientList = state.clientList.filter(ele =>
                ele.clientType == 'CORPORATE' || ele.clientType == 'PERSONAL'
            ).map((ele, index) => {
                ele.sno = ++index
                return ele
            })
        else if(tabIndex == 1)
            state.filteredClientList = state.clientList.filter(ele => 
                ele.clientType == 'PERSONAL'
            ).map((ele, index) => {
                ele.sno = ++index
                return ele
            })
        else if(tabIndex == 2)
            state.filteredClientList = state.clientList.filter(ele => 
                ele.clientType == 'CORPORATE'
            ).map((ele, index) => {
                ele.sno = ++index
                return ele
            })
    }
}