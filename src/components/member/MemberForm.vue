<template>
    <div class="wrapper" id="a">
        <h2>MemberShip Form</h2>
        <hr>
        <div class="section-header">Basic Details</div>
        <div class="section">
            <div class="column right-align" id="t">
                <span>FirstName:</span>
                <span>LastName:</span>
                <span>Date Of Birth:</span>
                <span>Gender:</span>
            </div>
            <div class="column left-align">
                <input type="text" class="input-field" v-model="FirstName">
                <input type="text" class="input-field" v-model="LastName">
                <date-picker  input-class="input-date" calendar-class="input-date" wrapper-class="input-date"></date-picker>
                <span class="s"><input type="radio" name="gender" id="male" value="Male"><label for="gender">Male</label>
                <input type="radio" name="gender" id="female" value="Female"><label for="gender">Female</label>
                <input type="radio" name="gender" id="others">Others</span>
            </div>
        </div>
        <div class="section-header">Address</div>
        <v-address></v-address>
        <div class="section-header">Contact Details</div>
        <div class="section">
            <div class="column right-align" id="t">
                <span>Primary Email Address:</span>
                <span>Secondary Email Address:</span>
                <span>Primary Ph No:</span>
                <span>Secondary Ph No:</span>
            </div>
            <div class="column left-align">
                <input type="email" class="input-field" v-model="pe">
                <input type="email" class="input-field" v-model="ae">
                <input type="number" maxlength="10" class="input-field" v-model="pp">
                <input type="number" maxlength="10" class="input-field" v-model="ap">
                
            </div>
        </div>
        <div class="section-header">Occupation Details</div>
        <div class="section">
            <div class="column right-align" id="t">
                <span>Company Name:</span>
                <span>Company Location:</span>
            </div>
            <div class="column left-align">
                <input type="text" class="input-field" v-model="pe">
                <input type="text" class="input-field" v-model="ae">
            </div>
        </div>
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
            // clientId: '',
            // type:'',
            FirstName: '',
            LastName: '',
            pan: '',
            website: '',
            supportEmail: '',
            pe:'',
            ae:'',
            pp:'',
            ap:''
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
.s{
    margin-top: 5px;
    margin-left: -5px;
}






</style>