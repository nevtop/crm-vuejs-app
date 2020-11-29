<template>
    <ul class="nav">
        <li v-for="(tab, index) in tabs" v-bind:key="index">
            <a 
                class="nav-items" 
                v-bind:class="{ active: tab.name == selected.name }" 
                v-on:click="selectTab(tab)">{{
                    tab.name
            }}</a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        selected: {
            type: Object,
            default: {}
        },
        tabs: Array,
    },
    methods: {
        selectTab: function (tab) {
            this.$store.commit('SET_SELECTED_TAB', tab)
        }
    }
};
</script>

<style scoped>
.nav {
    list-style-type: none;
    padding-left: 125px;
    display: flex;
    justify-content: flex-start;
    box-shadow: 0px 2px 0px #008cba;
}

.nav-items {
    text-decoration: none;
    outline: 0;
    color: white;
    background-color: #008cba;
    padding: 14px 16px;
    margin: 3px;
    font-size: 17px;
    font-weight: 900;
    line-height: 285%;
    border: 2px solid #008cba;
    /* transition: border-bottom-color 0.10s ease-in; */
    cursor: pointer;
}

.nav-items.active {
    border-bottom-color: white;
    border-bottom-width: 3px;
    color: black;
    background-color: white;
}
</style>