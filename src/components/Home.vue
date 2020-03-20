<template>
    <div ref="container-home" class="container-home">
        <top-bar></top-bar>
        <side-nav></side-nav>
    </div>
</template>

<script>
import SideNav from './common/SideNav.vue'
import TopBar from './common/TopBar.vue'

export default {
    data: function () {
        return {}
    },
    components: {
        'side-nav': SideNav,
        'top-bar': TopBar
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-home {
    transition: 0.5s;
}
</style>
