<template>
    <div>
        <input 
            type="text" 
            v-model="searchValue" 
            v-bind:placeholder="placeholder" 
            v-bind:style="{ width: width }" 
            class="search"
        >
        <button class="link">
            <font-awesome-icon icon="filter" size="lg" transform="shrink-4"/>
            Filter
        </button>
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
ul {
    list-style-type: none;
    text-align: left;
    display: inline-block;
    background: gray;
    padding-left: 0pt;
}

.search {
    background-image: url('../../assets/searchicon.png');
    background-position: 10px 10px;
    background-repeat: no-repeat;
    font-size: 16px;
    padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    outline: none;
}

.link {
    color: black;
    text-align: center;
    background-color: #fff;
    height: 44px;
    padding: 12px 10px;
    text-decoration: none;
    font-size: 14px;
    border: 1px solid #ddd;
    transition-duration: 0.4s;
    cursor: pointer;
    outline: none;
}

.link:hover {
    background-color: #008cba;
    color: white;
}
</style>