<template>
    <div class="menu-icon" @click="toggleMenuIcon">
        <div v-bind:class="{ 'change': change }">
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
            change: false
        }
    },
    methods: {
        toggleMenuIcon: function () {
            this.change = !this.change
            EventBus.$emit('toggle-side-nav', this.change)
        }
    },
    created: function () {
        EventBus.$on('toggle-menu-icon', (change) => {
            this.change = change
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