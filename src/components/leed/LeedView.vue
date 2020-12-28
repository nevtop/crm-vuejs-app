<template>
    <div>
        <div class="flex-sb">
            <div class="view-heading">
                <label for="heading">Client</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ getLeedName }}</label>
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
        <template v-else-if="selectedTab.name === 'HISTORY'">
            <!-- left-blank -->
        </template>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import LeedForm from '@/components/leed/LeedForm'
import { mapGetters } from 'vuex';

export default {
    components: {
        'tab-nav': TabNav,
        'leed-form': LeedForm
    },
    data: function () {
        return {
            tabs: [
                { name: 'PROFILE', buttons: [{ route: 'EditLeed', label: 'Edit Profile' }] },
                { name: 'HISTORY', buttons: [] }
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
            params: 'GET_ROUTE_PARAMS',
            leedInfo: 'GET_LEED_INFO',
            selectedTab: 'GET_SELECTED_TAB'
        }),
        getLeedName: function () {
            return (this.params.LeedView) ? this.params.LeedView.leedName : ""
        }
    }
}
</script>

<style scoped>
</style>