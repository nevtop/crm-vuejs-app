<template>
    <div>
        <div class="flex-sb">
            <div class="view-heading">
                <label for="heading">Session</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ getSessionName }}</label>
                <v-button :status="getStatus"></v-button>
            </div>
            <div style="margin-right: 125px">
                <router-link
                    v-for="(button, index) in selectedTab.buttons"
                    :key="index"
                    class="link"
                    :to="{ name: button.route , query: { traineeId: $route.params.id } }"
                >{{ button.label }}</router-link>
            </div>
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
import VButton from '@/components/elements/vbutton'
import { mapGetters } from 'vuex'

export default {
    components: {
        'tab-nav': TabNav,
        'session-form': SessionForm,
        'trainees': Trainees,
        'v-button': VButton
    },
    data: function () {
        return {
            tabs: [
                { name: 'PROFILE', buttons: [{ route: 'EditSession', label: 'Edit Profile' }]},
                { name: 'TRAINEE', buttons: [{ route: 'AddTrainee', label: 'Add Trainee' },
                    { route: 'FindTraineeModal', label: 'Existing Trainee' }]},
                { name: 'SERVICE', buttons: [{ route: 'AddTrainee', label: 'Add Service' }]}
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
            sessionInfo: 'GET_SESSION_INFO',
            selectedTab: 'GET_SELECTED_TAB'
        }),
        getSessionName: function () {
            return (this.sessionInfo) ? this.sessionInfo.sessionName : ""
        },
        getStatus: function () {
            if (this.sessionInfo) {
                return (this.sessionInfo.active) 
                    ? { name: 'Running', type: 'active' }
                    : { name: 'Stopped', type: 'inactive' }
            }
            return { name: 'Unknown', type: 'info' }
        }
    }
}
</script>

<style scoped>
</style>