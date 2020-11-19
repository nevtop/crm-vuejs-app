<template>
    <div>
        <div class="header">
            <div class="label-heading">
                <label for="heading">Session</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ params.sessionName }}</label>
            </div>
            <router-link class="link" :to="{ name: route.name }">{{ route.label }}</router-link>
        </div>
        <tab-nav v-bind:tabs="tabs" v-bind:selected="selected" v-on:select-tab="selectTab"/>
        <!-- <router-view name="client-view"></router-view> -->
        <template v-if="selected === 'PROFILE'">
            <session-form :sessionInfo="sessionInfo"></session-form>
        </template>
        <template v-else-if="selected === 'MEMBER'">
        </template>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import SessionForm from '@/components/session/SessionForm'
import { mapGetters } from 'vuex';

export default {
    components: {
        'tab-nav': TabNav,
        'session-form': SessionForm
    },
    data: function () {
        return {
            selected: 'PROFILE',
            route: { name: 'EditSession', label: 'Edit Profile' },
            tabs: ['PROFILE', 'MEMBERS', 'PAYMENT HISTORY']
        }
    },
    computed: {
        ...mapGetters({
            params: 'GET_ROUTE_PARAMS',
            sessionInfo: 'GET_SESSION_INFO'
        })
    },
    methods: {
        selectTab: function (tabName) {
            this.selected = tabName;
            if (this.selected === 'PROFILE') {
                this.route.name = 'EditSession'
                this.route.label = 'Edit Profile'
            } else {
                this.route.name = 'AddMember'
                this.route.label = 'Add Member'
            }
        } 
    },
    created: function () {
        this.$store.dispatch('RETRIEVE_SESSION_INFO', this.$route.params.id)
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