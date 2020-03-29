<template>
    <div class="menu-icon" @click="drawn ?  closeSideNav() : openSideNav()">
        <div v-bind:class="{ 'change': drawn }">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
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
        openSideNav: function () {
            this.drawn = true;
            EventBus.$emit('toggleSideNav', this.drawn)
        },
        closeSideNav: function () {
            this.drawn = false
            EventBus.$emit('toggleSideNav', this.drawn)
        }
    },
    created: function () {
        EventBus.$on('changeMenuIcon', (drawn) => {
            this.drawn = drawn
        })
    }
}
</script>

<style scoped>
.menu-icon {
    display: inline-block;
    font-size: 40px;
    color: black;
    margin: 5px;
    border: 2px solid #008cba;
    padding: 5px 15px;
    transition-duration: 0.4s;
    cursor: pointer;
}

.menu-icon:hover {
    background-color: #008cba;
}

.bar1, .bar2, .bar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.5s;
}

.change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {opacity: 0;}

.change .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
}
</style>