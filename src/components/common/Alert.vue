<template>
    <div class="alert" v-bind:class="type">
        <span>
            <font-awesome-icon v-bind:icon="icon" size="2x" transform="down-2 shrink-4"/>
        </span>
        <span>{{ message }}</span>
        <span class="closebtn" @click="closeAlert">&times;</span>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            iconName: ''
        }
    },
    props: ['type', 'message'],
    methods: {
        closeAlert: function () {
            this.$emit('closeAlertEvent')
        }
    },
    computed: {
        icon: function () {
            if(this.type == 'error') return ['fas', 'times-circle']
            if(this.type == 'success') return ['fas', 'check-circle']
            if(this.type == 'info') return ['fas', 'info-circle']
            if(this.type == 'warning') return ['fas', 'exclamation-circle']
        }
    }
}
</script>

<style scoped>
.alert {
	width: 400px;
  	padding: 15px;
  	opacity: 1;
  	transition: opacity 0.6s;
  	margin-bottom: 15px;
    border-radius: 5px;
}
.alert.error {background-color: #f44336;}
.alert.success {background-color: #4CAF50;}
.alert.info {background-color: #2196F3;}
.alert.warning {background-color: #ff9800;}

.closebtn {
  margin: 5px;
  color: black;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: white;
}
</style>