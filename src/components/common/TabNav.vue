<template>
    <div>
        <div>
            <ul class="nav">
                <li v-for="(tab, index) in tabs" v-bind:key="index">
                    <a href="#" class="nav-items" v-bind:class="{ active: tab == selected }" 
                            v-on:click="selectTab(tab)">
                        {{ tab }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selected: String,
        tabs: Array,
    },
    methods: {
        selectTab: function (tab) {
            this.$emit('select-tab', tab)
        }
    }
};
</script>

<style scoped>
.nav {
    list-style-type: none;
    display: flex;
    justify-content: center;
    box-shadow: inset 0 -1px 0 #e1e4e8;
}

.nav-items {
    text-decoration: none;
    color: black;
    padding: 8px 30px;
    font-size: 20px;
    line-height: 40px;
    border-bottom: 2px solid rgba(209, 213, 218, 0);
    transition: border-bottom-color 0.25s ease-in;
}

.nav-items.active {
    font-weight: 600;
    border-bottom-color: #f9826c;
}

.nav-items:not(.active):hover {
    border-bottom-color: #d1d5da;
    transition-timing-function: ease-out;
    transition-duration: 0.25s;
}
</style>