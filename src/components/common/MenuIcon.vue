<template>
    <div class="menu-icon" @click="bool ? openNav() : closeNav()">
        <div v-bind:class="{'change': !bool}">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            bool: true
        }
    },
    methods: {
        openNav: function () {
            console.log('openNav()');
            this.bool = false;
            this.$parent.$parent.$children[1].$refs['sidenav'].style.width = '20%'
            this.$parent.$parent.$refs['container-home'].style.marginLeft = '20%'

        },
        closeNav: function () {
            console.log('closeNav()');
            this.bool = true
            this.$parent.$parent.$children[1].$refs['sidenav'].style.width = '0%'
            this.$parent.$parent.$refs['container-home'].style.marginLeft = '0%'
        }
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