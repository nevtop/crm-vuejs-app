<template>
    <div>
        <div class="header">
            <div class="label-heading">
                <label for="heading">Client</label> 
                <font-awesome-icon icon="caret-right" size="lg" transform="down-1 shrink-8"/>
                <label for="">{{ params.clientName }}</label>
            </div>
            <router-link class="link" :to="{ name: route.name }">{{ route.label }}</router-link>
        </div>
        <tab-nav v-bind:tabs="tabs" v-bind:selected="selected" v-on:select-tab="selectTab"/>
        <!-- <router-view name="client-view"></router-view> -->
        <template v-if="selected === 'PROFILE'">
            <client-form :clientInfo="clientInfo"></client-form>
        </template>
        <template v-else-if="selected === 'SESSIONS'">
            <client-session></client-session>
        </template>
    </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'
import ClientForm from '@/components/client/ClientForm'
import ClientSession from '@/components/client/ClientSession'
import { mapGetters } from 'vuex';

export default {
    components: {
        'tab-nav': TabNav,
        'client-form': ClientForm,
        'client-session': ClientSession
    },
    data: function () {
        return {
            selected: 'PROFILE',
            route: { name: 'EditClient', label: 'Edit Profile' },
            tabs: ['PROFILE', 'SESSIONS']
        }
    },
    computed: {
        ...mapGetters({
            params: 'GET_ROUTE_PARAMS',
            clientInfo: 'GET_CLIENT_INFO'
        })
    },
    methods: {
        selectTab: function (tabName) {
            this.selected = tabName;
            if (this.selected === 'PROFILE') {
                this.route.name = 'EditClient'
                this.route.label = 'Edit Profile'
            } else {
                this.route.name = 'AddSession'
                this.route.label = 'Add Session'
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