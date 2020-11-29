<template>
    <div>
        <div class="header">
            <div class="label-heading">
                <label for="heading">Session</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ getSessionName }}</label>
            </div>
            <router-link 
                class="link" 
                :to="{ name: selectedTab.route , query: { sessionId: $route.params.id } }"
            >{{ selectedTab.label }}</router-link>
        </div>
        <tab-nav v-bind:tabs="tabs" v-bind:selected="selectedTab"/>
        <template v-if="selectedTab.name === 'PROFILE'">
            <session-form :sessionInfo="sessionInfo"></session-form>
        </template>
        <template v-else-if="selectedTab.name === 'TRAINEE'">
            <trainees></trainees>
        </template>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import SessionForm from '@/components/session/SessionForm'
import Trainees from '@/components/trainee/Trainees'
import { mapGetters } from 'vuex';

export default {
    components: {
        'tab-nav': TabNav,
        'session-form': SessionForm,
        'trainees': Trainees
    },
    data: function () {
        return {
            tabs: [
                { name: 'PROFILE', route: 'EditSession', label: 'Edit Profile' },
                { name: 'TRAINEE', route: 'AddTrainee', label: 'Add Trainee' }
            ]
        }
    },
    created: function () {
        if (this.$store.getters.GET_SELECTED_TAB) {
            this.$store.commit('SET_SELECTED_TAB', this.$store.getters.GET_SELECTED_TAB)
        } else {
            this.$store.commit('SET_SELECTED_TAB', this.tabs[0])
        }
        this.$store.dispatch('RETRIEVE_SESSION_INFO', this.$route.params.id)
        this.$store.dispatch('FETCH_CLIENT_SELECT_LIST')
    },
    computed: {
        ...mapGetters({
            params: 'GET_ROUTE_PARAMS',
            sessionInfo: 'GET_SESSION_INFO',
            selectedTab: 'GET_SELECTED_TAB'
        }),
        getSessionName: function () {
            if (this.params.SessionView) {
                return this.params.SessionView.sessionName
            }
            return ""
        }
    }
}
</script>

<style scoped>
.header {
    display:flex;
    justify-content: space-between;
    margin: 0px 130px;
}

.label-heading {
    height: 45px;
    font-size: 25px;
    font-weight: bold;
    line-height: 40px;
    width: 950px;
}

.link {
    color: black;
    font-weight: normal;
    text-align: center;
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