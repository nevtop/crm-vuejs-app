<template>
    <div class="wrapper" id="a">
        <h2>Session Registration</h2>
        <hr>
        <div class="section">
            <div class="column right-align">
                <label for="client_type">Associated With:</label>
            </div>
            <div class="column left-align" id="y">
                <select v-model="clientId">
                    <option disabled value="">Please select one</option>
                    <option value="PERSONAL">Personal</option>
                    <option value="CORPORATE">Corporate</option>
                </select>
            </div>
            <div class="column right-align" id="x">
                <label for="client_type">Session Type:</label>
            </div>
            <div class="column left-align" id="y">
                <select v-model="type">
                    <option disabled value="">Please select one</option>
                    <option value="PERSONAL">Beginner</option>
                    <option value="CORPORATE">Advanced</option>
                </select>
            </div>
        </div>
        <div class="section-header">Basic Details</div>
        <div class="section">
            <div class="column right-align" id="t">
                <span>Name:</span>
                <span>Start Date:</span>
                <span>End Date:</span>
            </div>
            <div class="column left-align">
                <input type="text" class="input-field" v-model="name">
                <date-picker  input-class="input-date" calendar-class="input-date" wrapper-class="input-date"></date-picker>
                <date-picker  input-class="input-date" calendar-class="input-date" wrapper-class="input-date"></date-picker>
            </div>
        </div>
        <div class="section-header">Address</div>
        <v-address></v-address>
        <div class="action">
            <button type="button" class="btn" v-on:click="register">Create</button>
            <button type="button" class="btn" v-on:click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import Address from '@/components/Address'
import Datepicker from 'vuejs-datepicker';

export default {
    data: function () {
        return {
            clientId: '',
            type:'',
            name: '',
            gst: '',
            pan: '',
            website: '',
            supportEmail: ''
        }
    },
    components: {
        'v-address': Address,
        'date-picker': Datepicker
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
#a{
  border-color:rgb(12, 83, 80);
}
.wrapper {
    max-width: 700px;
    margin: auto;
    border: 1px solid #b3b3b2;
    border-radius: 10px;
    padding: 30px 70px;
}

.action {
    margin-top: 50px;
}

.btn {
    width: 140px;
    height: 40px;
}
#x{
  margin-left: 100px;
}




</style>