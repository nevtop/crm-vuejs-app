<template>
    <div class="module-wrapper">
        <template v-if="sessionPage || sessionTab">
            <div v-if="sessionPage" class="flex-sb mb-25">
                <label class="module-heading">Sessions</label>
                <router-link :to="{ name: 'AddSession' }" class="link">New Session</router-link>
            </div>
            <search v-if="sessionPage" width='250px' placeholder="Search for sessions.."></search>
            <table-view v-bind:list="sessionList" action="SessionView">
                <table-column label="Session Name" map="sessionName"></table-column>
                <table-column label="Session Type" map="sessionType"></table-column>
                <table-column v-if="sessionPage" label="Client Name" map="clientName"></table-column>
                <table-column label="Status" map="status"></table-column>
                <table-column label="Trainee" map="traineeCount"></table-column>
                <table-column label="Package" map="packageCode"></table-column>
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
            sessionTab: false
        }
    },
    components: {
        'search': Search,
        'table-view': TableView,
        'table-column': TableColumn
    },
    created: function () {
        switch (this.$route.name) {
            case 'Sessions':
                this.$store.dispatch('FETCH_ALL_SESSIONS')
                this.setState(true, false)
                break
            case 'ClientView':
                this.setState(false, true)
                break
            case 'TraineeView':
                this.setState(false, true)
                break
            default:
                this.setState(false, false)
        }

        this.$store.dispatch('FETCH_CLIENT_SELECT_LIST')
    },
    computed: {
        ...mapGetters({
            sessionList: 'GET_SESSION_LIST'
        })
    },
    methods: {
        setState: function (bool1, bool2) {
            this.sessionPage = bool1
            this.sessionTab = bool2
        }
    },
    watch: {
        $route (to, next) {
            if (to.name === 'Sessions') {
                this.sessionPage = true
                if (this.$store.getters.IS_DATA_MODIFIED) {
                    this.$store.dispatch('FETCH_ALL_SESSIONS')
                    this.$store.commit('DATA_MODIFIED', false)
                }
            } else {
                this.sessionPage = false
            }
        }
    }
}
</script>

<style scoped>
</style>