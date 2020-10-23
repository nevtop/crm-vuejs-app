<template>
    <div class="section">
        <div class="column right-align" id="t">
            <span>Address Line 1:</span>
            <span>Address Line 2:</span>
            <span>City:</span>
            <span>State:</span>
            <span>Pincode:</span>
            <span>Country:</span>
        </div>
        <div class="column left-align">
            <input type="text" class="input-field" v-model="addressLine1">
            <input type="text" class="input-field" v-model="addressLine2">
            <input type="text" class="input-field" v-model="city">
            <input type="text" class="input-field" v-model="state">
            <input type="text" class="input-field" v-model="pincode">
            <input type="text" class="input-field" v-model="country">
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pincode: '',
            country: ''
        }
    }
}
</script>

<style scoped>
</style>