<template>
    <div class="sidenav" v-bind:class="{ 'drawn': drawn }">
        <a href="#" class="menu-item">About</a>
        <router-link :to="{name: 'Leeds'}" v-on:click.native="emitEvents" class="menu-item">Leeds</router-link>
        <router-link :to="{name: 'Clients'}" v-on:click.native="emitEvents" class="menu-item">Clients</router-link>
        <router-link :to="{name: 'Sessions'}" v-on:click.native="emitEvents" class="menu-item">Sessions</router-link>
        <router-link :to="{name: 'Trainees'}" v-on:click.native="emitEvents" class="menu-item">Trainees</router-link>
        <router-link :to="{name: 'Accounts'}" v-on:click.native="emitEvents" class="menu-item">Accounts</router-link>
        <router-link :to="{name: 'Setting'}" v-on:click.native="emitEvents" class="menu-item">Settings</router-link>
    </div>
</template>

<script>
import { EventBus } from '@/vuejs/event-bus'

export default {
    data: function () {
        return {
            drawn: false
        }
    },
    methods: {
        emitEvents: function () {
            EventBus.$emit('toggle-menu-icon', false)
            EventBus.$emit('toggle-side-nav', false)
            this.$store.commit('SET_SELECTED_TAB', null)
        }
    },
    created: function () {
        EventBus.$on('toggle-side-nav', (drawn) => {
            this.drawn = drawn
        })
    }
}
</script>

<style scoped>
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #111;
    overflow: auto;
    transition: width 0.5s ease;
}

.drawn {
    width: 20%
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
    border: 1px solid #008cba;
    cursor: pointer;
}

.sidenav .menu-item:hover {
    background-color: #008cba;
    color: white;
}
</style>
