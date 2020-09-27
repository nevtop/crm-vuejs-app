import Axios from 'axios'
import { Store } from '@/store/vue-store.js'

Axios.defaults.baseURL = process.env.BASE_URL
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Axios.defaults.timeout = 10000;

export const sendRequest = (config) => {
    /* use this config after refreshing API token */
    Store.commit('ADD_REQUEST_CONFIG', config) 
    return Axios({
        method: config._method,
        url: config._url,
        data: config._data,
        params: config._params,
        headers: config._headers
    })
}