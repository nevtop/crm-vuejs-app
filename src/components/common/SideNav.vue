<template>
    <div ref="sidenav" class="sidenav">
        <div>
            <a href="#" class="menu-item">About</a>
            <a href="#" class="menu-item">Services</a>
            <a href="#" class="menu-item">Clients</a>
            <router-link :to="{name: 'Setting'}" v-on:click.native="emitEvents()" class="menu-item">Setting</router-link>
        </div>
    </div>
</template>

<script>
import { EventBus } from '@/vuejs/event-bus'

export default {
    data: function () {
        return {}
    },
    methods: {
        emitEvents: function () {
            EventBus.$emit('changeMenuIcon', false)
            EventBus.$emit('toggleSideNav', false)
        }
    },
    created: function () {
        EventBus.$on('toggleSideNav', (drawn) => {
            if (drawn === true) {
                this.$refs['sidenav'].style.width = '20%'
            } else {
                this.$refs['sidenav'].style.width = '0%'
            }
        })
    }
}
</script>

<style scoped>
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-y: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidenav .menu-item {
    padding: 14px 16px;
    margin: 5px;
    text-decoration: none;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    display: block;
    transition-duration: 0.4s;
    border: 1px solid #008cba;
    cursor: pointer;
}

.sidenav .menu-item:hover {
    background-color: #008cba;
    color: white;
}
</style>
