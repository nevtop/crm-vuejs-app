<template>
    <div>
        <div class="header">
            <div class="label-heading">
                <label for="heading">Trainee</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ getTraineeName }}</label>
            </div>
            <router-link 
                class="link" 
                :to="{ name: selectedTab.route , query: { traineeId: $route.params.id } }"
            >{{ selectedTab.label }}</router-link>
        </div>
        <tab-nav v-bind:tabs="tabs" v-bind:selected="selectedTab"/>
        <template v-if="selectedTab.name === 'PROFILE'">
            <trainee-form :traineeInfo="traineeInfo"></trainee-form>
        </template>
        <template v-else-if="selectedTab.name === 'SESSION'">
            <sessions></sessions>
        </template>
        <template v-else-if="selectedTab.name === 'WORKOUT PLAN'">
            <!-- <trainees></trainees> -->
        </template>
        <template v-else-if="selectedTab.name === 'DIET PLAN'">
            <!-- <trainees></trainees> -->
        </template>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import TraineeForm from '@/components/trainee/TraineeForm'
import Sessions from '@/components/session/Sessions'
import { mapGetters } from 'vuex'

export default {
    components: {
        'tab-nav': TabNav,
        'trainee-form': TraineeForm,
        'sessions': Sessions
    },
    data: function () {
        return {
            tabs: [
                { name: 'PROFILE', route: 'EditTrainee', label: 'Edit Profile' },
                { name: 'SESSION', route: 'AddSession', label: 'Add Session' },
                { name: 'WORKOUT PLAN', route: 'AddWorkout', label: 'Add Plan' },
                { name: 'DIET PLAN', route: 'AddDiet', label: 'Add Plan' }
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
            params: 'GET_ROUTE_PARAMS',
            traineeInfo: 'GET_TRAINEE_INFO',
            selectedTab: 'GET_SELECTED_TAB'
        }),
        getTraineeName: function () {
            if (this.params.TraineeView) {
                return this.params.TraineeView.firstName + " " 
                    + this.params.TraineeView.lastName
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