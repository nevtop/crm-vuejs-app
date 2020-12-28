<template>
    <div id="app" ref="root" class="root">
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
            if (to.name === 'Login' || to.name === 'ForgotPassword')
                this.login = true
            else
                this.login = false
        }
    },
    created: function () {
        if (this.$route.name === 'Login' || this.$route.name === 'ForgotPassword')
            this.login = true
        else
            this.login = false
            
        EventBus.$on('toggle-side-nav', (drawn) => {
            const width = (drawn) ? '20%' : '0%'
            this.$refs['root'].style.marginLeft = width
        })
    }
}
</script>

<style>
@import './styles/main.css';
@import './styles/util.css';

.root {
    transition: 0.5s;
}
</style>
