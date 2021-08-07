<template>
    <div class="module-wrapper">
        <template v-if="accountPage">
            <div class="flex-sb mb-25">
                <label class="module-heading">Accounts</label>
                <router-link :to="{ name: 'NewInvoice' }" class="link">New Invoice</router-link>
            </div>
            <search width='250px' placeholder="Search for sessions.."></search>
            <table-view v-bind:list="billingList" action="InvoiceView">
                <table-column label="Invoice No" map="invoiceId"></table-column>
                <table-column label="Date" map="date"></table-column>
                <table-column label="Payment Mode" map="paymentMode"></table-column>
                <table-column label="Status" map="status"></table-column>
                <table-column label="Amount" map="amount"></table-column>
            </table-view>
        </template>
        <router-view name="accounts"></router-view>
    </div>
</template>

<script>
import Search from '@/components/common/Search'
import TableView from '@/components/table/TableView.vue'
import TableColumn from '@/components/table/TableColumn.vue'

export default {
    data: function () {
        return {
            accountPage: true,
            billingList: []
        }
    },
    components: {
        'search': Search,
        'table-view': TableView,
        'table-column': TableColumn
    },
    created: function () {
        if (this.$route.name === 'Accounts') {
            this.accountPage = true
        } else {
            this.accountPage = false
        }
    },
    watch: {
        $route(to, next) {
            if (to.name === 'Accounts') {
                this.accountPage = true
            } else {
                this.accountPage = false
            }
         }
    }
}
</script>

<style scoped>
</style>
