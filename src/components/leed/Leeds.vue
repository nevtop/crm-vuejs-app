<template>
    <div class="module-wrapper">
        <template v-if="leedPage">
            <div class="flex-sb mb-25">
                <label class="module-heading">Leeds</label>
                <router-link :to="{ name: 'AddLeed'}" class="link">New Leed</router-link>
            </div>
            <search width='250px' placeholder="Search a lead..."></search>
            <table-view v-bind:list="leedList" action="LeedView">
                <table-column label="Leed Name" map="leedName"></table-column>
                <table-column label="Stage" map="stage"></table-column>
                <table-column label="Status" map="status"></table-column>
                <table-column label="Source" map="source"></table-column>
                <table-column label="Email" map="email"></table-column>
                <table-column label="Phone No" map="phone"></table-column>
                <table-column label="City" map="city"></table-column>
                <table-column label="State" map="state"></table-column>
            </table-view>
        </template>
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
</style>