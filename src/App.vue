<template>
    <div id="app" ref="container-app" class="container">
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
            if (drawn) {
                this.$refs['container-app'].style.marginLeft = '20%'
                const links = document.getElementsByClassName("link");
                for(let i = 0; i < links.length; i++) {
                    links[i].classList.add("expand");
                }
            } else {
                this.$refs['container-app'].style.marginLeft = '0%'
                const links = document.getElementsByClassName("link");
                for(let i = 0; i < links.length; i++) {
                    links[i].classList.remove("expand");
                }
            }
        })
    }
}
</script>

<style>
@import './styles/main.css';
@import './styles/util.css';

.container {
    transition: 0.5s;
}
</style>
