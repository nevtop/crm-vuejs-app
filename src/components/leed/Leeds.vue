<template>
    <div>
        <div v-if="leedPage" class="wrapper">
            <div class="heading">
                <label class="label-heading">Leeds</label>
                <router-link :to="{ name: 'AddLeed'}" class="link">New Leed</router-link>
            </div>
            <search width='250px' placeholder="Search for leeds.."></search>
            <table-view v-bind:list="leedList" action="LeedView">
                <table-column label="Leed Name" map="leedName"></table-column>
                <table-column label="Status" map="status"></table-column>
                <table-column label="Stage" map="stage"></table-column>
                <table-column label="Source" map="source"></table-column>
                <table-column label="Email" map="email"></table-column>
                <table-column label="Phone No" map="phone"></table-column>
                <table-column label="City" map="city"></table-column>
                <table-column label="State" map="state"></table-column>
            </table-view>
        </div>
        <router-view name="leeds"></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '@/components/common/Search'
import TableView from '@/components/table/TableView.vue'
import TableColumn from '@/components/table/TableColumn.vue'

export default {
    data: function () {
        return {
            leedPage: true
        }
    },
    components: {
        'search': Search,
        'table-view': TableView,
        'table-column': TableColumn
    },
    created: function () {
        if (this.$route.name === 'Leeds') {
            this.$store.dispatch('FETCH_ALL_LEEDS')
            this.leedPage = true
        } else {
            this.leedPage = false
        }
    },
    computed: {
        ...mapGetters({
            leedList: 'GET_LEED_LIST'
        })
    },
    methods: {},
    watch: {
        $route (to, next) {
            if (to.name === 'Leeds') {
                this.leedPage = true
                if (this.$store.getters.IS_DATA_MODIFIED) {
                    this.$store.dispatch('FETCH_ALL_LEEDS')
                    this.$store.commit('DATA_MODIFIED', false)
                }
            } else {
                this.leedPage = false
            }
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 1100px;
    margin: auto;
}

.heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
}

.label-heading {
    height: 45px;
    font-size: 25px;
    font-weight: bold;
    line-height: 40px;
}

.link {
    color: black;
    text-align: center;
    height: 18px;
    padding: 12px 10px;
    text-decoration: none;
    font-size: 15px;
    border: 2px solid #008cba;
    transition-duration: 0.4s;
    cursor: pointer;
}

.link:hover {
    background-color: #008cba;
    color: white;
}
</style>