<template>
    <div class="section-wrapper">
        <template v-if="clientPage">
            <div class="flex-sb mb-25">
                <label class="section-heading">Clients</label>
                <router-link :to="{ name: 'AddClient' }" class="link">New Client</router-link>
            </div>
            <search width='250px' placeholder="Search for clients.."></search>
            <table-view v-bind:list="clientList" action="ClientView">
                <table-column label="Client Name" map="clientName"></table-column>
                <table-column label="Client Type" map="clientType"></table-column>
                <table-column label="Status" map="status"></table-column>
                <table-column label="Boarding Date" map="onboardingDate"></table-column>
                <table-column label="City" map="city"></table-column>
                <table-column label="State" map="state"></table-column>
            </table-view>
        </template>
        <router-view name="clients"></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '@/components/common/Search'
import TableView from '@/components/table/TableView.vue'
import TableColumn from '@/components/table/TableColumn.vue'

export default {
    data: function () {
        return {
            clientPage: true
        }
    },
    components: {
        'search': Search,
        'table-view': TableView,
        'table-column': TableColumn
    },
    created: function () {
        if (this.$route.name === 'Clients') {
            this.$store.dispatch('FETCH_ALL_CLIENTS')
            this.clientPage = true
        } else {
            this.clientPage = false
        }

        if (this.$store.getters.GET_CLIENT_SELECT_LIST.length == 0) {
            this.$store.dispatch('FETCH_CLIENT_SELECT_LIST')
        }
    },
    computed: {
        ...mapGetters({
            clientList: 'GET_CLIENT_LIST'
        })
    },
    methods: {},
    watch: {
        $route (to, next) {
            if (to.name === 'Clients') {
                this.clientPage = true
                if (this.$store.getters.IS_DATA_MODIFIED) {
                    this.$store.dispatch('FETCH_ALL_CLIENTS')
                    this.$store.dispatch('FETCH_CLIENT_SELECT_LIST')
                    this.$store.commit('DATA_MODIFIED', false)
                }
            } else {
                this.clientPage = false
            }
        }
    }
}
</script>

<style scoped>
</style>