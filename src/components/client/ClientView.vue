<template>
    <div>
        <div class="header">
            <div class="label-heading">
                <label for="heading">Client</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ params.clientName }}</label>
            </div>
            <router-link class="link" :to="{ name: route.name }">{{ route.linkName }}</router-link>
        </div>
        <tab-nav v-bind:tabs="tabs" v-bind:selected="selected" v-on:select-tab="selectTab"/>
        <!-- <router-view name="client-view"></router-view> -->
        <client-form :clientInfo="clientInfo"></client-form>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import ClientForm from '@/components/client/ClientForm'
import { mapGetters } from 'vuex';

export default {
    components: {
        'tab-nav': TabNav,
        'client-form': ClientForm
    },
    data: function () {
        return {
            selected: 'Profile',
            route: { name: 'EditClient', linkName: 'Edit Profile' },
            tabs: [
                { name: 'Profile', routeName: 'ClientProfile' },
                { name: 'Sessions', routeName: 'ClientSessions' }
            ]
        }
    },
    computed: {
        ...mapGetters({
            params: 'GET_ROUTE_PARAMS',
            clientInfo: 'GET_CLIENT_INFO'
        })
    },
    methods: {
        selectTab: function (tab) {
            this.selected = tab;
            if (this.selected === 'Profile') {
                this.route.name = 'ClientForm'
                this.route.linkName = 'Edit Profile'
            } else {
                this.route.name = 'SessionForm'
                this.route.linkName = 'Add Session'
            }
        } 
    },
    created: function () {
        this.$store.dispatch('RETRIEVE_CLIENT_INFO', this.$route.params.id)
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
}

.link:hover {
    background-color: #008cba;
    color: white;
}
</style>