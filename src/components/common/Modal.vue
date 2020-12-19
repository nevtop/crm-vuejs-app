<template>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <button class="close" v-on:click="$emit('close')">&times;</button>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    },
    data: function () {
        return {
            x: true,
            y: true,
            cities: ["bangalore","mysore","delhi"],
            city: ""
        }
    },
    methods: {
        span: function() {
            this.x = true;
        }
    }
}
</script>

<style>
.modal {
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 35px;
    font-weight: bold;
    background-color: white;
    border-style: none;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
    outline: none;
}
</style>