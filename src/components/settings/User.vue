<template>
    <div class="wrapper">
        <template v-if="userPage">
            <div class="search-bar">
                <search width='900px' placeholder="Search for users.."></search>
                <router-link :to="{ name: 'UserRegistration' }" class="link" v-on:click.native="userPage = !userPage">New User</router-link>
            </div>
        </template>
        <router-view name="user"></router-view>
    </div>
</template>

<script>
import Search from '@/components/common/Search'
import UserRegistration from './UserRegistration'
export default {
    data: function () {
        return {
            userPage: true
        }
    },
    components: {
        'search': Search,
        'user-registration': UserRegistration
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