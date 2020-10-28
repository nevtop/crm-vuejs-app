<template>
    <div>
        <div v-if="clientPage" class="wrapper">
            <div class="heading">
                <label class="label-heading">Clients</label>
                <router-link :to="{ name: 'AddClient'}" class="link">New Client</router-link>
            </div>
            <search width='250px' placeholder="Search for clients.."></search>
            <table-view v-bind:list="clientList" action="ClientView">
                <table-column label="Client Name" map="clientName"></table-column>
                <table-column label="Client Type" map="clientType"></table-column>
                <table-column label="Boarding Date" map="onboardingDate"></table-column>
                <table-column label="City" map="city"></table-column>
                <table-column label="State" map="state"></table-column>
            </table-view>
        </div>
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
        if (this.$route.name !== 'Clients') {
            this.clientPage = false
        }
        this.$store.dispatch('FETCH_ALL_CLIENTS')
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
                if (this.$store.getters.IS_DATA_ADDED) {
                    this.$store.dispatch('FETCH_ALL_CLIENTS')
                    this.$store.commit('NEW_DATA_ADDED', false)
                }
            } else {
                this.clientPage = false
            }
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 1100px;
    margin: auto;
}

.heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
}

.label-heading {
    height: 45px;
    font-size: 25px;
    font-weight: bold;
    line-height: 40px;
}

.link {
    color: black;
    text-align: center;
    height: 18px;
    padding: 12px 10px;
    text-decoration: none;
    font-size: 15px;
    border: 2px solid #008cba;
    transition-duration: 0.4s;
    cursor: pointer;
}

.link:hover {
    background-color: #008cba;
    color: white;
}
</style>