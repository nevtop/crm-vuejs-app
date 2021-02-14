<template>
    <div id="leed-view">
        <div class="flex-sb">
            <div class="view-heading">
                <label for="heading">Leed</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ getLeedName }}</label>
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
            <leed-form :leedInfo="leedInfo"></leed-form>
        </template>
        <template v-else-if="selectedTab.name === 'TIMELINE'">
            <leed-timeline :leedInfo="leedInfo"></leed-timeline>
        </template>
        <template v-else-if="selectedTab.name === 'DOCUMENT'">
            <leed-doc></leed-doc>
        </template>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import LeedForm from '@/components/leed/LeedForm'
import LeedTimeline from '@/components/leed/LeedTimeline'
import VButton from '@/components/elements/CustomButton'
import LeedDocument from '@/components/leed/LeedDocument'
import { mapGetters } from 'vuex';

export default {
    components: {
        'tab-nav': TabNav,
        'leed-form': LeedForm,
        'leed-timeline': LeedTimeline,
        'v-button': VButton,
        'leed-doc': LeedDocument
    },
    data: function () {
        return {
            tabs: [
                { name: 'PROFILE', buttons: [{ route: 'EditLeed', label: 'Edit Profile' }] },
                { name: 'TIMELINE', buttons: [] },
                { name: 'DOCUMENT', buttons: [{ route: 'ModalBox', label: 'Add Document' }]}
            ]
        }
    },
    created: function () {
        if (this.$store.getters.GET_SELECTED_TAB) {
            this.$store.commit('SET_SELECTED_TAB', this.$store.getters.GET_SELECTED_TAB)
        } else {
            this.$store.commit('SET_SELECTED_TAB', this.tabs[0])
        }
        this.$store.dispatch('RETRIEVE_LEED_INFO', this.$route.params.id)
    },
    computed: {
        ...mapGetters({
            leedInfo: 'GET_LEED_INFO',
            selectedTab: 'GET_SELECTED_TAB'
        }),
        getLeedName: function () {
            return (this.leedInfo) ? this.leedInfo.leedName : ""
        },
        getStatus: function () {
            if (this.leedInfo) {
                return (this.leedInfo.active)
                    ? { name: 'Active', type: 'active' }
                    : { name: 'Reject', type: 'inactive' }
            }
            return { name: 'Unknown', type: 'info' }
        }
    }
}
</script>

<style scoped>
</style>