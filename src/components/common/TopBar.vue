<template>
    <div ref="topbar" class="topbar">
        <menu-icon></menu-icon>
        <a target="_blank" href="http://nevtop.in/" class="logo">
            <img src="@/assets/nevtop.png" />
        </a>
        <router-link :to="{name: 'Login', query: { logout: true }}" class="link">Logout</router-link>
        <router-link :to="{name: 'Home'}" class="link">Home</router-link>
    </div>
</template>

<script>
import MenuIcon from './MenuIcon.vue'

export default {
    data: function () {
        return {}
    },
    components: {
        'menu-icon': MenuIcon
    }
}
</script>

<style scoped>
.topbar {
    background-color: #fff;
    overflow: hidden;
}

.topbar .logo {
    left: 35%;
    right: 50%;
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
    padding: 14px 16px;
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