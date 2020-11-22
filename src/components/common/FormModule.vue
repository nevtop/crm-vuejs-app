<template>
    <div id="form-module">
        <slot name="form-control"></slot>
        <div class="section-header">{{ name }}</div>
        <div class="section" :class="{ 'grey-out': disable }">
            <div class="column right-align">
                <span v-for="(item, index) in items" v-bind:key="index">{{ item.label }} : </span>
            </div>
            <div v-if="mode === 'ADD' || mode === 'EDIT'" class="column left-align">
                <span v-for="(item, index) in items" v-bind:key="index">
                    <template v-if="item.input === 'text'">
                        <input 
                            v-bind:ref="item.map"
                            type="text" 
                            class="input-field" 
                            v-bind:value="item.value"
                            v-on:input="inputValue"
                        >
                    </template>
                    <template v-if="item.input === 'number'">
                        <input 
                            v-bind:ref="item.map"
                            type="number" 
                            class="input-field" 
                            v-bind:value="item.value"
                            v-on:input="inputValue"
                        >
                    </template>
                    <template v-else-if="item.input === 'select'">
                        <select :ref="item.map" @change="inputValue" :disabled="item.disabled">
                            <option value="" :disabled="isDisabled(item.value)">Select a option</option>
                            <option 
                                v-for="(model, index) in item.models"
                                :key="index"
                                :value="model.value"
                                :selected="isSelected(model.value, item.value)"
                            >{{
                                model.key
                            }}</option>
                        </select>
                    </template>
                    <template v-else-if="item.input === 'radio'">
                        <label v-for="(model, index) in item.models" :key="index">
                            <input 
                                type="radio" 
                                :ref="item.map"
                                :name="item.map" 
                                :value="model.value"
                                :checked="isSelected(model.value, item.value)"
                                @input="inputValue"
                            >
                        {{ model.key }}
                        </label>
                    </template>
                    <template v-else-if="item.input === 'checkbox'">
                        <label v-for="(model, index) in item.models" :key="index">
                            <input 
                                type="checkbox" 
                                :ref="item.map"
                                :name="item.map" 
                                :value="model.value"
                                :checked="isSelected(model.value, item.value)"
                                @input="inputValue"
                            >
                        {{ model.key }}
                        </label>
                    </template>
                    <template v-else-if="item.input === 'date'">
                        <date-picker 
                            :ref="item.map"
                            :value="new Date(item.value)"
                            @selected="inputValue"
                        />
                    </template>
                </span>
            </div>
            <div v-else class="column left-align">
                <span v-for="(item, index) in items" v-bind:key="index">
                    <template v-if="item.value">
                        <template v-if="item.input === 'select'">{{ getSelectedElement(item.value, item.models) }}</template>
                        <template v-else-if="item.input === 'radio'">{{ getSelectedElement(item.value, item.models) }}</template>
                        <template v-else>{{ item.value }}</template>
                    </template>
                    <template v-else>-</template>
                </span>
            </div>
        </div>
        <div style="display:none;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
    components: {
        'date-picker': Datepicker
    },
    props: {
        name: String,
        mode: String,
        value: {
            type: Object,
            default: null
        },
        disable: {
            type: Boolean,
            default: false
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
                input: field.propsData.input,
                label: field.propsData.label,
                map: field.propsData.map,
                models: field.propsData.models,
                value: this.value[`${field.propsData.map}`],
                disabled: field.propsData.disabled
            };
            return item;
        });
    },
    methods: {
        inputValue: function () {
            let newVal = {};
            this.items.forEach((item) => {

                switch (item.input) {
                    case 'text': 
                        newVal[`${item.map}`] = this.$refs[`${item.map}`][0].value
                        break
                    case 'number': 
                        newVal[`${item.map}`] = this.$refs[`${item.map}`][0].value
                        break
                    case 'select':
                        newVal[`${item.map}`] = this.$refs[`${item.map}`][0].value
                        break
                    case 'radio':
                        const array = this.$refs[`${item.map}`].filter(ele => ele.checked)
                        if (array.length > 0) {
                            newVal[`${item.map}`] = array[0].value
                        } else {
                            newVal[`${item.map}`] = ''
                        }
                        break
                    case 'checkbox':
                        newVal[`${item.map}`] = new Array()
                        this.$refs[`${item.map}`].filter(ele => ele.checked)
                            .map(ele => ele.value)
                            .forEach(ele => newVal[`${item.map}`].push(ele))
                        break
                    case 'date':
                        newVal[`${item.map}`] = this.$refs[`${item.map}`][0].selectedDate.getTime()
                        break

                    default:
                }
            });
            this.$emit("input", newVal);
        },
        isDisabled: function (val) {
            return val ? true : false
        },
        isSelected: function (key, val) {
            if (Array.isArray(val) && val.length >= 0) {
                return val.includes(key)
            }
            return key == val
        },
        getSelectedElement: function (val, models) {
            const model = models.filter(ele => ele.value == val)
            return model[0].key
        }
    },
    watch: {
        value: function (newVal) {
            this.items = this.items.map((item) => {
                let obj = {
                    input: item.input,
                    label: item.label,
                    map: item.map,
                    models: item.models,
                    value: newVal[`${item.map}`],
                    disabled: item.disabled
                };
                return obj;
            });
        },
    }
}
</script>

<style>
.grey-out {
    background-color: gray;
    opacity:0.5; 
    pointer-events:none;
}
</style>