<template>
    <div>
        <div class="row">
            <div class="col-1">
                <label for="addressline1_lb" class="mb-5">Address Line 1</label>
                <input type="text" class="input-address" v-model="addressline1">
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="addressline2_lb" class="mb-5">Address Line 2</label>
                <input type="text" class="input-address" v-model="addressline2">
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <label for="city_lb" class="mb-5">City</label>
                <input type="text" class="input-field" v-model="city">
            </div>
            <div class="col-2">
                <label for="state_lb" class="mb-5">State</label>
                <input type="text" class="input-field" v-model="state">
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <label for="pincode_lb" class="mb-5">Pin Code</label>
                <input type="text" class="input-field" v-model="pincode">
            </div>
            <div class="col-2">
                <label for="country_lb" class="mb-5">Country</label>
                <input type="text" class="input-field" v-model="country">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            addressline1: '',
            addressline2: '',
            city: '',
            state: '',
            pincode: '',
            country: ''
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 700px;
    margin: auto;
    padding: 70px 90px 70px 70px;
}

.row {
    display: flex;
    flex-wrap: wrap;
}

.col-1 {
    margin: 15px;
}

.col-2 {
    display: flex;
    flex-direction: column;
    width: calc((100% - 60px) / 2);
    margin: 15px;
}

.input-field {
    height: 40px;
}

.input-address {
    width: 640px;
    height: 40px;
}
</style>