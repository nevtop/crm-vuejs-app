<template>
    <div>
        <div class="flex-sb">
            <div class="view-heading">
                <label for="heading">Client</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ getClientName }}</label>
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
import VButton from '@/components/elements/CustomButton'
import { mapGetters } from 'vuex';

export default {
    components: {
        'tab-nav': TabNav,
        'client-form': ClientForm,
        'sessions': Sessions,
        'v-button': VButton
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
            clientInfo: 'GET_CLIENT_INFO',
            selectedTab: 'GET_SELECTED_TAB'
        }),
        getClientName: function () {
            return (this.clientInfo) ? this.clientInfo.clientName : ""
        },
        getStatus: function () {
            if (this.clientInfo) {
                return (this.clientInfo.active) 
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