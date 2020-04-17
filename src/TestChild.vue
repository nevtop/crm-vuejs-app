<template>
    <div v-if="false">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        map: String
    },
    data: function() {
        return {}
    }
};
</script>

<style>
</style>