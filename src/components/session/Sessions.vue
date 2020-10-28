<template>
    <div class="wrapper">
        <template v-if="sessionPage">
            <div class="heading">
                <label class="label-heading">Sessions</label>
                <router-link :to="{ name: 'SessionForm' }" class="link">New Session</router-link>
            </div>
            <search width='250px' placeholder="Search for sessions.."></search>
            <table-view v-bind:list="sessionList" action="SessionProfile">
                <table-column label="Session Name" map="sessionName"></table-column>
                <table-column label="Session Type" map="sessionType"></table-column>
                <table-column label="Status" map="status"></table-column>
                <table-column label="Member" map="memberCount"></table-column>
                <table-column label="Package" map="packageCode"></table-column>
                <table-column label="Start Date" map="startDate"></table-column>
                <table-column label="End Date" map="endDate"></table-column>
                <table-column label="City" map="city"></table-column>
                <table-column label="State" map="state"></table-column>
            </table-view>
        </template>
        <router-view name="sessions"></router-view>
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
            sessionPage: true,
            sessionList: [
                {
                    sessionName: 'Deepa Bhardwaj',
                    sessionType: 'REGULAR',
                    status: 'RUNNING',
                    memberCount: 2,
                    packageCode: 'CWC-2',
                    startDate: '02-05-2020 09:20:59',
                    endDate: '02-06-2020 09:20:59',
                    city: 'New Delhi',
                    state: 'Delhi'
                }
            ]
        }
    },
    components: {
        'search': Search,
        'table-view': TableView,
        'table-column': TableColumn
    },
    created: function () {
        if (this.$route.name !== 'Sessions') {
            this.sessionPage = false
        }
        // this.$store.dispatch('FETCH_ALL_SESSIONS')
    },
    computed: {
        // ...mapGetters({
        //     clientList: 'GET_SESSION_LIST'
        // })
    },
    methods: {},
    watch: {
        $route (to, next) {
            if (to.name === 'Sessions') {
                this.sessionPage = true
                // if (this.$store.getters.IS_DATA_ADDED) {
                //     this.$store.dispatch('FETCH_ALL_SESSIONS')
                //     this.$store.commit('NEW_DATA_ADDED', false)
                // }
            } else {
                this.sessionPage = false
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
    float: right;
    display: block;
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