<template>
    <div id="form-module">
        <div class="section-header">{{ name }}</div>
        <div class="section">
            <div class="column right-align">
                <span v-for="(item, index) in items" v-bind:key="index">{{ item.label }}</span>
            </div>
            <div v-if="mode === 'ADD' || mode === 'EDIT'" class="column left-align">
                <input 
                    v-for="(item, index) in items" 
                    v-bind:key="index"
                    v-bind:ref="item.map"
                    type="text" 
                    class="input-field" 
                    v-bind:value="item.value"
                    v-on:input="updateValue"
                >
            </div>
            <div v-else class="column left-align">
                <span v-for="(item, index) in items" v-bind:key="index">{{ item.value }}</span>
            </div>
        </div>
        <div style="display:none;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        mode: String,
        value: {
            type: Object,
            default: null
        }
    },
    data: function () {
        return {
            items: []
        }
    },
    mounted: async function() {
        const fieldSlots = this.$slots.default
                .filter((field) => field.componentInstance)
                .map((field) => field.componentOptions);

        this.items = fieldSlots.map((field) => {
            let item = {
                label: field.propsData.label,
                map: field.propsData.map,
                value: this.value[`${field.propsData.map}`],
            };
            return item;
        });
    },
    methods: {
        updateValue: function () {
            let newVal = {};
            this.items.forEach((item) => {
                newVal[`${item.map}`] = this.$refs[`${item.map}`][0].value;
            });
            this.$emit("input", newVal);
        },
    },
    watch: {
        value: function (newVal) {
            this.items = this.items.map((item) => {
                let obj = {
                    label: item.label,
                    map: item.map,
                    value: newVal[`${item.map}`]
                };
                return obj;
            });
        },
    }
}
</script>

<style>

</style>