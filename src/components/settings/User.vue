<template>
    <div class="wrapper">
        <template v-if="userPage">
            <div class="search-bar">
                <search width='900px' placeholder="Search for users.."></search>
                <router-link :to="{ name: 'UserRegistration' }" class="link" v-on:click.native="userPage = !userPage">New User</router-link>
            </div>
            <table-view v-if="true" v-bind:data="data">
                <table-column label="First Name" map="firstName"></table-column>
                <table-column label="Last Name" map="lastName"></table-column>
                <table-column label="Age" map="age"></table-column>
            </table-view>
        </template>
        <router-view name="user"></router-view>
    </div>
</template>

<script>
import Search from '@/components/common/Search'
import UserRegistration from '@/components/settings/UserRegistration.vue'
import TableView from '@/components/table/TableView.vue'
import TableColumn from '@/components/table/TableColumn.vue'

export default {
    components: {
        'search': Search,
        'user-registration': UserRegistration,
        'table-view': TableView,
        'table-column': TableColumn
    },
    data: function () {
        return {
            userPage: true,
            data: [
                { userId: 1, firstName: 'John', lastName: 'Lennon', age: 72 },
                { userId: 2, firstName: 'Paul', lastName: 'McCartney', age: 70 },
                { userId: 3, firstName: 'George', lastName: 'Harrison', age: 22 },
                { userId: 4, firstName: 'Ringo', lastName: 'Starr', age: 2 },
            ]
        }
    },
    watch: {
        $route (to, next) {
            if(to.name === 'User')
                this.userPage = true
        }
    },
    created: function () {
        if(this.$route.name !== 'User')
            this.userPage = false
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
</style>