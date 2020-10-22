<template>
    <div>
        <div class="label-heading">
            <label for="heading">Client</label> 
            <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
            <label for="">{{ params.clientName }}</label>
        </div>
        <tab-nav v-bind:tabs="tabs" v-bind:selected="selected" v-on:select-tab="selectTab"/>
        <router-view name="client-view"></router-view>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import { mapGetters } from 'vuex';

export default {
    components: {
        'tab-nav': TabNav
    },
    data: function () {
        return {
            selected: 'Profile',
            tabs: [
                {
                    name: 'Profile',
                    routeName: 'ClientProfile'
                },
                {
                    name: 'Sessions',
                    routeName: 'ClientSessions'
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            params: 'GET_ROUTE_PARAMS'
        })
    },
    methods: {
        selectTab: function (tab) {
            this.selected = tab;
        } 
    },
    created: function () {
        this.$store.dispatch('RETRIEVE_CLIENT_INFO', this.$route.params.id)
    }
}
</script>

<style scoped>
.label-heading {
    height: 45px;
    font-size: 25px;
    font-weight: bold;
    line-height: 40px;
    width: 1100px;
    margin: auto;
}
</style>