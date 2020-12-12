<template>
    <div>
        <div class="header">
            <div class="label-heading">
                <label for="heading">Client</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ getClientName }}</label>
            </div>
            <router-link
                v-for="(button, index) in selectedTab.buttons"
                :key="index"
                class="link"
                :to="{ name: button.route , query: { traineeId: $route.params.id } }"
            >{{ button.label }}</router-link>
        </div>
        <tab-nav v-bind:tabs="tabs" v-bind:selected="selectedTab"/>
        <template v-if="selectedTab.name === 'PROFILE'">
            <client-form :clientInfo="clientInfo"></client-form>
        </template>
        <template v-else-if="selectedTab.name === 'SESSIONS'">
            <sessions></sessions>
        </template>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import ClientForm from '@/components/client/ClientForm'
import Sessions from '@/components/session/Sessions'
import { mapGetters } from 'vuex';

export default {
    components: {
        'tab-nav': TabNav,
        'client-form': ClientForm,
        'sessions': Sessions
    },
    data: function () {
        return {
            tabs: [
                { name: 'PROFILE', buttons: [{ route: 'EditClient', label: 'Edit Profile' }]},
                { name: 'SESSIONS', buttons: [{ route: 'AddSession', label: 'Add Session'}]}
            ]
        }
    },
    created: function () {
        if (this.$store.getters.GET_SELECTED_TAB) {
            this.$store.commit('SET_SELECTED_TAB', this.$store.getters.GET_SELECTED_TAB)
        } else {
            this.$store.commit('SET_SELECTED_TAB', this.tabs[0])
        }
        this.$store.dispatch('RETRIEVE_CLIENT_INFO', this.$route.params.id)
    },
    computed: {
        ...mapGetters({
            params: 'GET_ROUTE_PARAMS',
            clientInfo: 'GET_CLIENT_INFO',
            selectedTab: 'GET_SELECTED_TAB'
        }),
        getClientName: function () {
            if (this.params.ClientView) {
                return this.params.ClientView.clientName
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
    margin: auto;
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
    width: 115px;
    margin: 0px 5px;
}

.link:hover {
    background-color: #008cba;
    color: white;
}

.expand {
    width: 185px;
    transition-duration: 0.4s;
}
</style>