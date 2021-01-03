<template>
    <div>
        <div class="flex-sb">
            <div class="view-heading">
                <label for="heading">Trainee</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ getTraineeName }}</label>
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
            <trainee-form :traineeInfo="traineeInfo"></trainee-form>
        </template>
        <template v-else-if="selectedTab.name === 'SESSION'">
            <sessions></sessions>
        </template>
        <template v-else-if="selectedTab.name === 'WORKOUT PLAN'">
            <!-- left-blank -->
        </template>
        <template v-else-if="selectedTab.name === 'DIET PLAN'">
            <!-- left-blank -->
        </template>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import TraineeForm from '@/components/trainee/TraineeForm'
import Sessions from '@/components/session/Sessions'
import VButton from '@/components/elements/CustomButton'
import { mapGetters } from 'vuex'

export default {
    components: {
        'tab-nav': TabNav,
        'trainee-form': TraineeForm,
        'sessions': Sessions,
        'v-button': VButton
    },
    data: function () {
        return {
            tabs: [
                { name: 'PROFILE', buttons: [{ route: 'EditTrainee', label: 'Edit Profile' }]},
                { name: 'SESSION', buttons: [{ route: 'AddSession', label: 'Add Session' },
                    { route: 'FindSessionModal', label: 'Existing Session' }]},
                { name: 'WORKOUT PLAN', buttons: [{ route: 'AddWorkout', label: 'Add Plan' }]},
                { name: 'DIET PLAN', buttons: [{ route: 'AddDiet', label: 'Add Plan' }]}
            ]
        }
    },
    created: function () {
        if (this.$store.getters.GET_SELECTED_TAB) {
            this.$store.commit('SET_SELECTED_TAB', this.$store.getters.GET_SELECTED_TAB)
        } else {
            this.$store.commit('SET_SELECTED_TAB', this.tabs[0])
        }
        this.$store.dispatch('RETRIEVE_TRAINEE_INFO', this.$route.params.id)
        this.$store.dispatch('FETCH_SESSION_SELECT_LIST')
    },
    computed: {
        ...mapGetters({    
            traineeInfo: 'GET_TRAINEE_INFO',
            selectedTab: 'GET_SELECTED_TAB'
        }),
        getTraineeName: function () {
            return (this.traineeInfo && this.traineeInfo.profile)
                ? this.traineeInfo.profile.firstName + " " + this.traineeInfo.profile.lastName
                : ""
        },
        getStatus: function () {
            if (this.traineeInfo && this.traineeInfo.profile) {
                return (this.traineeInfo.profile.active) 
                    ? { name: 'Active', type: 'active' }
                    : { name: 'Inactive', type: 'inactive' }
            }
            return { name: 'Unknown', type: 'info' }
        }
    }
}
</script>

<style scoped>
</style>