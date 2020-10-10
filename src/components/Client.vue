<template>
    <div class="wrapper">
        <template v-if="clientPage">
            <div class="search-bar">
                <label class="label-heading">Clients</label>
                <search width='500px' placeholder="Search for clients.."></search>
                <router-link :to="{ name: 'ClientForm' }" class="link">New Client</router-link>
            </div>
            <div class="tab">
                <button class="tablinks active" v-on:click="switchTab($event, 0)">All Clients</button>
                <button class="tablinks" v-on:click="switchTab($event, 1)">Personal</button>
                <button class="tablinks" v-on:click="switchTab($event, 2)">Corporate</button>
            </div>
            <div>
                <table-view v-bind:list="clientList" action="ClientProfile">
                    <table-column label="Client Name" map="clientName"></table-column>
                    <table-column label="Client Type" map="clientType"></table-column>
                    <table-column label="Boarding Date" map="onboardingDate"></table-column>
                    <table-column label="City" map="city"></table-column>
                    <table-column label="State" map="state"></table-column>
                </table-view>
            </div>
        </template>
        <router-view name="client"></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '@/components/common/Search'
import TableView from '@/components/table/TableView.vue'
import TableColumn from '@/components/table/TableColumn.vue'

export default {
    data: function () {
        return {
            clientPage: true
        }
    },
    components: {
        'search': Search,
        'table-view': TableView,
        'table-column': TableColumn
    },
    created: function () {
        if (this.$route.name !== 'Client') {
            this.clientPage = false
        }
        this.$store.dispatch('FETCH_ALL_CLIENTS')
    },
    computed: {
        ...mapGetters({
            clientList: 'GET_CLIENT_LIST'
        })
    },
    methods: {
        switchTab: function (event, tabIndex) {
            const tablinks = document.getElementsByClassName("tablinks");
            
            for (let i = 0; i < tablinks.length; i++)
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            
            event.target.className += " active";

            this.$store.commit('FILTER_CLIENT_LIST', tabIndex)
        }
    },
    watch: {
        $route (to, next) {
            if (to.name === 'Client') {
                this.clientPage = true
                if (this.$store.getters.IS_CLIENT_ADDED) {
                    this.$store.dispatch('FETCH_ALL_CLIENTS')
                    this.$store.commit('NEW_CLIENT_ADDED', false)
                }
            } else {
                this.clientPage = false
            }
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 1100px;
    margin: auto;
}

.search-bar {
    display: flex;
    justify-content: space-between;
}

.label-heading {
    height: 45px;
    font-size: 25px;
    font-weight: bold;
}

.link {
    float: right;
    display: block;
    color: black;
    text-align: center;
    height: 18px;
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

.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

.tab button {
    background-color: inherit;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

.tab button:hover {
    background-color: #ddd;
}

.tab button.active {
    background-color: #ccc;
}
</style>