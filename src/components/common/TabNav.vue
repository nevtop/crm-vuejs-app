<template>
    <ul class="nav">
        <li v-for="(tab, index) in tabs" v-bind:key="index">
            <router-link class="nav-items" v-bind:class="{ active: tab.name == selected }" :to="{ name: tab.routeName }"
                    v-on:click.native="selectTab(tab)">
                {{ tab.name }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        selected: String,
        tabs: Array,
    },
    methods: {
        selectTab: function (tab) {
            this.$emit('select-tab', tab.name)
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
    color: black;
    padding: 14px 16px;
    margin: 5px;
    font-size: 17px;
    line-height: 280%;
    border: 2px solid #008cba;
    transition: border-bottom-color 0.25s ease-in;
    cursor: pointer;
}

.nav-items.active {
    border-bottom-color: #e1e4e8;
}
</style>