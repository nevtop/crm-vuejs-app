<template>
    <div ref="topbar" class="topbar">
        <menu-icon></menu-icon>
        <a target="_blank" href="https://www.nevtop.com/" class="logo">
            <img src="@/assets/nevtop.png" />
        </a>
        <router-link class="link" :to="{}" @click.native="logout">Logout</router-link>
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
    </div>
</template>

<script>
import MenuIcon from '@/components/common/MenuIcon.vue'

export default {
    data: function () {
        return {}
    },
    components: {
        'menu-icon': MenuIcon
    },
    methods: {
        logout: function () {
            this.$store.dispatch('PERFORM_LOGOUT', 'logout')
        }
    }
}
</script>

<style scoped>
.topbar {
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0px 3px 5px 0px #888;
    margin-bottom: 25px;
}

.topbar .logo {
    left: 35%;
    right: 50%;
    top: -6px;
    position: relative;
}

img {
    width: 148px;
    scale: 1.5;
}

.topbar .link {
    float: right;
    display: block;
    color: black;
    font-weight: bold;
    text-align: center;
    padding: 12px 10px;
    text-decoration: none;
    font-size: 17px;
    margin: 5px;
    border: 2px solid #008cba;
    transition-duration: 0.4s;
    cursor: pointer;
}

.topbar .link:hover {
    background-color: #008cba;
    color: white;
}
</style>