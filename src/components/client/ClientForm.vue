<template>
    <div class="wrapper">
        <h2 class="ml-10">Client Registration</h2>
        <div class="row">
            <div class="col-1">
                <label for="gender_lb" class="mb-5">Type</label>
                <div class="mt-5">
                    <span class="mr-10">
                        <input type="radio" value="PERSONAL" v-model="type">
                        <label for="personal_lb">Personal</label>
                    </span>
                    <span>
                        <input type="radio" value="CORPORATE" v-model="type">
                        <label for="corporate_lb">Corporate</label>
                    </span>
                </div>
            </div>
        </div>
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
                <input type="text" class="input-field" v-model="supportEmail">
            </div>
        </div>
        <div class="row">
            <div class="action">
                <button type="button" class="btn" v-on:click="register">Create</button>
                <button type="button" class="btn" v-on:click="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import Address from '@/components/Address'

export default {
    data: function () {
        return {
            type: '',
            name: '',
            gst: '',
            pan: '',
            website: '',
            supportEmail: ''
        }
    },
    components: {
        'v-address': Address
    },
    methods: {
        register: function () {
            const clientData = {
                clientType: this.type,
                clientName: this.name.trim(),
                active: true,
                panNo: this.pan.trim(),
                gstNo: this.gst.trim(),
                website: this.website.trim(),
                supportEmail: this.supportEmail.trim(),
                address: {
                    addressLine1: this.$children[0].$data.addressLine1, 
                    addressLine2: this.$children[0].$data.addressLine2,
                    city: this.$children[0].$data.city,
                    state: this.$children[0].$data.state,
                    pincode: this.$children[0].$data.pincode,
                    country: this.$children[0].$data.country
                }
            }
            this.$store.dispatch('REGISTER_CLIENT', clientData)
        },
        cancel: function () {
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