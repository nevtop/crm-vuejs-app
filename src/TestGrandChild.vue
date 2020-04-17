<template>
    <th>{{ label }}</th>
</template>

<script>
export default {
    props: ['column'],
    computed: {
        label: function () {
            return this.column.label;
        }
    }
};
</script>

<style>
</style>