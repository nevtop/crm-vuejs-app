<template>
    <div class="module-wrapper">
        <search width='250px' placeholder="Search for sessions.."></search>
        <table-view v-bind:list="billingList" action="InvoiceView">
            <table-column label="Invoice No" map="invoiceId"></table-column>
            <table-column label="Date" map="date"></table-column>
            <table-column label="Payment Mode" map="paymentMode"></table-column>
            <table-column label="Status" map="status"></table-column>
            <table-column label="Amount" map="amount"></table-column>
        </table-view>
    </div>
</template>

<script>
import Search from '@/components/common/Search'
import TableView from '@/components/table/TableView.vue'
import TableColumn from '@/components/table/TableColumn.vue'

export default {
    data: function () {
        return {
            billingList: []
        }
    },
    components: {
        'search': Search,
        'table-view': TableView,
        'table-column': TableColumn
    },
}
</script>

<style scoped>
</style>
