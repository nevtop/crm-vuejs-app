import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)

Axios.defaults.baseURL = process.env.BASE_URL
//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Axios.defaults.timeout = 10000;

export const sendRequest = (config) => {
    return Vue.axios({
        method: config._method,
        url: config._url,
        params: config._params,
        headers: config._headers,
        data: config._data
    })
}