<template>
    <div class="wrapper">
        <h2 class="ml-10">Client Registration</h2>
        <ul><li><h4>Basic Details</h4></li></ul>
        <div class="row">
            <div class="col-1">
                <label for="name_lb" class="mb-5">Client Name</label>
                <input type="text" class="input-address" v-model="name">
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <label for="gst_lb" class="mb-5">GST No</label>
                <input type="text" class="input-field" v-model="gst">
            </div>
            <div class="col-2">
                <label for="pan_lb" class="mb-5">PAN No</label>
                <input type="text" class="input-field" v-model="pan">
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <label for="industry_lb" class="mb-5">Industry</label>
                <select class="input-field" v-model="industry_selected">
                    <option value=""></option>
                </select>
            </div>
        </div>
        <ul><li><h4>Address</h4></li></ul>
        <v-address></v-address>
        <ul><li><h4>Other Information</h4></li></ul>
        <div class="row">
            <div class="col-2">
                <label for="website_lb" class="mb-5">Website</label>
                <input type="text" class="input-field" v-model="website">
            </div>
            <div class="col-2">
                <label for="support_email_lb" class="mb-5">Support Email</label>
                <input type="text" class="input-field" v-model="support_email">
            </div>
        </div>
        <div class="row">
                <div class="action">
                    <button type="button" class="btn">Create</button>
                    <button type="button" class="btn" v-on:click="goBack">Cancel</button>
                </div>
            </div>
    </div>
</template>

<script>
import Address from '@/components/Address'
export default {
    data: function () {
        return {
            name: '',
            gst: '',
            pan: '',
            industry_selected: '',
            website: '',
            support_email: ''
        }
    },
    components: {
        'v-address': Address
    },
    methods: {
        goBack: function () {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 700px;
    margin: auto;
    border: 1px solid #b3b3b2;
    border-radius: 10px;
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
    height: 45px;
}

.input-address {
    width: 640px;
    height: 45px;
}

.action {
    margin-top: 100px;
}

.btn {
    width: 140px;
    height: 40px;
}

</style>