<template>
    <div>
        <table class="content-table">
            <thead>
		        <tr>
		            <th v-for="(column, index) in columns" v-bind:key="index">{{ column.label }}</th>
		        </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" v-bind:key="row.id">
                    <td v-for="(column, index) in columns" v-bind:key="index">{{ row[column.map] }}</td>
                </tr>
            </tbody>
        </table>
        <div style="display:none;">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        list: Array
    },
    data: function () {
        return {
            columns: [],
            rows: []
        }
    },
    mounted: async function() {
        this.rows = this.list
        const columnSlots = this.$slots.default
            .filter(col => col.componentInstance)
            .map(col => col.componentOptions)

        this.columns = columnSlots.map(col => {
            let columnData = {}
            columnData['label'] = col.propsData.label
            columnData['map'] = col.propsData.map
            return columnData
        })
    },
    watch: {
        list: function () {
            this.rows = this.list
        }
    }
};
</script>

<style scoped>
.content-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 1100px;
    overflow: hidden;
}

.content-table thead tr {
    background-color: #008cba;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
}

.content-table th,
.content-table td {
    padding: 12px 15px;
}

.content-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.content-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
    border-bottom: 2px solid #008cba;
}

.content-table tbody tr.active-row {
    font-weight: bold;
    color: #008cba;
}
</style>