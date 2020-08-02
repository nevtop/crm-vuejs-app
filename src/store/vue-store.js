import Vue from 'vue'
import Vuex from 'vuex'
import Getters from './vue-getters'
import Mutations from './vue-mutations'
import Actions from './vue-actions'

Vue.use(Vuex)

export const Store = new Vuex.Store({
    state: {
        user: null,
        jwt: '',
        isAuthenticated: false,
        clientList: [],
        filteredClientList: []
    },
    getters: Getters,
    mutations: Mutations,
    actions: Actions
})