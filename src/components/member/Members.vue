<template>
    <div>
        <div v-if="memberPage" class="wrapper">
            <div class="heading">
                <label class="label-heading">Members</label>
                <router-link :to="{ name: 'AddMember'}" class="link">New Member</router-link>
            </div>
            <search width='250px' placeholder="Search for member.."></search>
            <table-view v-bind:list="memberList" action="MemberView">
                <table-column label="First Name" map="firstName"></table-column>
                <table-column label="Last Name" map="lastName"></table-column>
                <table-column label="Gender" map="gender"></table-column>
                <table-column label="Mobile" map="mobile"></table-column>
                <table-column label="Email" map="email"></table-column>
                <table-column label="City" map="city"></table-column>
                <table-column label="State" map="state"></table-column>
            </table-view>
        </div>
        <router-view name="members"></router-view>
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
            memberPage: true,
            memberList: [
                {   firstName: 'Deepa', lastName: 'Bhardwaj', gender: 'FEMALE', mobile: 8160556450, 
                    email: 'deepa.bhardwaj@email.com', city: 'New Delhi', state: 'Delhi'
                },
                {   firstName: 'Deepa', lastName: 'Bhardwaj', gender: 'FEMALE', mobile: 8160556450, 
                    email: 'deepa.bhardwaj@email.com', city: 'New Delhi', state: 'Delhi'
                },
                {   firstName: 'Deepa', lastName: 'Bhardwaj', gender: 'FEMALE', mobile: 8160556450, 
                    email: 'deepa.bhardwaj@email.com', city: 'New Delhi', state: 'Delhi'
                }
            ]
        }
    },
    components: {
        'search': Search,
        'table-view': TableView,
        'table-column': TableColumn
    },
    created: function () {
        if (this.$route.name !== 'Members') {
            this.memberPage = false
        }
        //this.$store.dispatch('FETCH_ALL_MEMBERS')
    },
    // computed: {
    //     ...mapGetters({
    //         memberList: 'GET_MEMBER_LIST'
    //     })
    // },
    methods: {},
    watch: {
        $route (to, next) {
            if (to.name === 'Members') {
                this.memberPage = true
                // if (this.$store.getters.IS_DATA_MODIFIED) {
                //     this.$store.dispatch('FETCH_ALL_MEMBERS')
                //     this.$store.commit('DATA_MODIFIED', false)
                // }
            } else {
                this.memberPage = false
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

.heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
}

.label-heading {
    height: 45px;
    font-size: 25px;
    font-weight: bold;
    line-height: 40px;
}

.link {
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
</style>