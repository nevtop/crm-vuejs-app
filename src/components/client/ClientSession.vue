<template>
    <div class="wrapper">
        <table-view v-bind:list="sessionList" action="SessionProfile">
            <table-column label="Session Name" map="sessionName"></table-column>
            <table-column label="Session Type" map="sessionType"></table-column>
            <table-column label="Status" map="status"></table-column>
            <table-column label="Member" map="memberCount"></table-column>
            <table-column label="Package" map="packageCode"></table-column>
            <table-column label="Start Date" map="startDate"></table-column>
            <table-column label="End Date" map="endDate"></table-column>
            <table-column label="City" map="city"></table-column>
            <table-column label="State" map="state"></table-column>
        </table-view>
    </div>
</template>

<script>
import TableView from '@/components/table/TableView.vue'
import TableColumn from '@/components/table/TableColumn.vue'

export default {
    data: function () {
        return {
            sessionList: [
                {
                    sessionName: 'Deepa Bhardwaj',
                    sessionType: 'REGULAR',
                    status: 'RUNNING',
                    memberCount: 2,
                    packageCode: 'CWC-2',
                    startDate: '02-05-2020 09:20:59',
                    endDate: '02-06-2020 09:20:59',
                    city: 'New Delhi',
                    state: 'Delhi'
                }
            ]
        }
    },
    components: {
        'table-view': TableView,
        'table-column': TableColumn
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 1100px;
    margin: auto;
}
</style>