<template>
    <button class="button" :class="status.type" style="vertical-align:middle">
        <span>{{ status.name }}</span>
    </button>
</template>

<script>
export default {
    props: {
        status: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style scoped>
.button {
    display: inline-block;
    border-radius: 4px;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    padding: 5px 10px;
    transition: all 0.25s;
    cursor: pointer;
    margin: 0 5px;
    outline: none;
    box-shadow: 0 5px #999;
}

.button.active { background-color: #4CAF50; }
.button.inactive { background-color: #f4511e; }
.button.info { background-color: #ff9800; }

.button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.25s;
}

.button span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.25s;
}

.button:hover span {
    padding-right: 25px;
}

.button:hover span:after {
    opacity: 1;
    right: 0;
}

.button:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}
</style>