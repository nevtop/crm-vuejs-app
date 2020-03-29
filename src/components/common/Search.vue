<template>
    <div>
        <input type="text" v-model="searchValue" v-bind:placeholder="placeholder" v-bind:style="{width: width}" class="search">
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            searchValue: ''
        }
    },
    props: ['placeholder', 'width']
}
</script>

<style scoped>
.search {
    background-image: url('../../assets/searchicon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    font-size: 16px;
    padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
}
</style>