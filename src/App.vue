<template>
    <div id="app" ref="container-app" class="container-app">
        <template v-if="!login">
            <top-bar></top-bar>
            <side-nav></side-nav>
        </template>
        <router-view name="app"></router-view>
    </div>
</template>

<script>
import SideNav from '@/components/common/SideNav.vue'
import TopBar from '@/components/common/TopBar.vue'
import { EventBus } from '@/vuejs/event-bus'

export default {
    components: {
        'side-nav': SideNav,
        'top-bar': TopBar,
    },
    data: function () {
        return {
            login: false,
        }
    },
    watch: {
        $route (to, from) {
            if (to.name === 'Login')
                this.login = true
        }
    },
    created: function () {
        if (this.$route.name === 'Login')
            this.login = true
        else
            this.login = false
            
        EventBus.$on('toggleSideNav', (drawn) => {
            if (drawn === true) {
                this.$refs['container-app'].style.marginLeft = '20%'
            } else {
                this.$refs['container-app'].style.marginLeft = '0%'
            }
        })
    }
}
</script>

<style>
@import './styles/main.css';
@import './styles/util.css';

.container-app {
    transition: 0.5s;
}
</style>
