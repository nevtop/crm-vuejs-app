<template>
    <div>
        <table>
            <thead>
		        <tr>
		            <th v-for="(column, index) in columns" v-bind:key="index">{{ column.label }}</th>
		        </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id">
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
        const colComps = this.$slots.default
            .filter(col => col.componentInstance)
            .map(col => col.componentOptions)


        this.columns = colComps.map(col => {
            let colData = {}
            colData.label = col.propsData.label
            colData.map = col.propsData.map
            return colData
        })
        await this.mapDataToRows()
    }
};
</script>

<style>
</style>