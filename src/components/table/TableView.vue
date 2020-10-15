<template>
    <div>
        <table class="content-table">
            <thead>
		        <tr>
                    <th>SNo</th>
		            <th v-for="(column, index) in columns" v-bind:key="index">{{ column.label }}</th>
                    <th>Action</th>
		        </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows" v-bind:key="index">
                    <td>{{ index + 1 }}</td>
                    <td v-for="(column, index) in columns" v-bind:key="index">{{ row[column.map] }}</td>
                    <td>
                        <router-link :to="{ name : action, params: { id: row.id } }" v-on:click.native="saveRowData(row)">view</router-link>
                    </td>
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
        list: Array,
        action: String
    },
    data: function () {
        return {
            columns: [],
            rows: []
        }
    },
    methods: {
        saveRowData: function (row) {
            this.$store.commit('SET_ROUTE_PARAMS', row)
        }
    },
    mounted: async function() {
        this.rows = this.list
        const columnSlots = this.$slots.default
            .filter(col => col.componentInstance)
            .map(col => col.componentOptions)

        this.columns = columnSlots.map(col => {
            let columnData = {
                label: col.propsData.label,
                map: col.propsData.map
            }
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