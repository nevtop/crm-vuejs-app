<template>
    <div>
        <table>
            <thead>
		        <tr>
		            <th v-for="(column, index) in columns" v-bind:key="index">{{ column.label }}</th>
		        </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" v-bind:key="Object.values(row)[0]">
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
        data: Array
    },
    data: function () {
        return {
            columns: [],
            rows: []
        }
    },
    methods: {
        mapDataToRows: async function () {
            this.rows = this.data
        }     
    },
    mounted: async function() {
        console.log(this.data)
        const columnSlots = this.$slots.default
            .filter(col => col.componentInstance)
            .map(col => col.componentOptions)


        this.columns = columnSlots.map(col => {
            let columnData = {}
            columnData.label = col.propsData.label
            columnData.map = col.propsData.map
            return columnData
        })

        await this.mapDataToRows()
    }
};
</script>

<style>
</style>