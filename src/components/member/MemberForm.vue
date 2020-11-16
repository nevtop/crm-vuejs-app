<template>
    <div class="wrapper" v-bind:style="{ maxWidth: maxWidth }">
        <h2 v-if="mode === 'ADD'" id="du">Add Member</h2>
        <h2 v-else-if="mode === 'EDIT'" id="du">Edit Member</h2>
        <hr>
        <div v-if="mode !== 'VIEW'" class="section" id="lb">
            <div class="column right-align">
                <label for="client_type">Member Type:</label>
            </div>
            <div class="column left-align" id="y">
                <select v-model="type">
                    <option disabled value="">Please select one</option>
                    <option value="PERSONAL">Personal</option>
                    <option value="CORPORATE">Corporate</option>
                </select>
            </div>
        </div>
        <form-module name="Basic Details" v-bind:mode="mode" v-model="basicDetails">
            <form-field  input="text" label="FirstName:" map="FirstName"></form-field>
            <form-field  input="text" label="LastName:" map="LastName"></form-field>
        </form-module>
        <div v-if="mode !== 'VIEW'" class="section">
            <div class="column right-align">
                <label for="Member_type">Date Of Birth:</label>
            </div>
            <div class="column left-align">
                <date-picker  input-class="input-date" calendar-class="input-date" wrapper-class="input-date" id="nan"></date-picker>
            </div>
        </div>
        <div v-if="mode !== 'VIEW'" class="section">
            <div class="column right-align">
                <label for="member_type">Gender:</label>
            </div>
            <div class="column left-align" id="web">
                
                <input type="radio" name="gender">
                <label for="Male">Male</label>
                
                <input type="radio" name="gender">
                <label for="Female">Female</label>
                
                <input type="radio" name="gender">
                <label for="Others">Others</label>
            </div>
        </div>
        <form-module name="Address Details" v-bind:mode="mode" v-model="address">
            <form-field  input="text" label="Address Line 1:" map="addressLine1"></form-field>
            <form-field  input="text" label="Address Line 2:" map="addressLine2"></form-field>
            <form-field  input="text" label="Area:" map="area"></form-field>
            <form-field  input="text" label="City:" map="city"></form-field>
            <form-field  input="text" label="State:" map="state"></form-field>
            <form-field  input="text" label="Pincode:" map="pincode"></form-field>
            <form-field  input="text" label="Country:" map="country"></form-field>
        </form-module>
        <form-module name="Other Details" v-bind:mode="mode" v-model="otherDetails">
            <form-field  input="text" label="Primary Email Address:" map="primaryemailaddress"></form-field>
            <form-field  input="text" label="Secondary Email Address:" map="secondaryemailaddress"></form-field>
            <form-field  input="text" label="Primary Phone Number:" map="primaryphonenumber"></form-field>
            <form-field  input="text" label="Secondary Phone Number:" map="secondaryphonenumber"></form-field>
        </form-module>
        <div v-if="mode !== 'VIEW'" class="action">
            <button type="button" class="btn" v-on:click="process">{{ buttonName }}</button>
            <button type="button" class="btn" v-on:click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import FormModule from '@/components/common/FormModule'
import FormField from '@/components/common/FormField'
import { mapper } from '@/commonjs/util'
import Datepicker from 'vuejs-datepicker'

export default {
    props: {
        MemberInfo: Object
    },
    components: {
        'form-module': FormModule,
        'form-field': FormField,
        'date-picker': Datepicker
    },
    data: function () {
        return {
            type: '',
            mode: '',
            basicDetails: { FirstName: '', LastName: '', gender: '',dob:'' },
            address: { addressLine1: '', addressLine2: '', city: '',
                area: '', state: '', pincode: '', country: ''
            },
            otherDetails: { primaryemailaddress: '', secondaryemailaddress: '',primaryphonenumber:'', secondaryphonenumber:''},
            maxWidth: '1000px',
            buttonName: 'Create'
        }
    },
    created: function () {
        if (this.$route.name === 'AddMember') {
            this.mode = 'ADD'
        } else if (this.$route.name === 'EditMember') {
            this.mode = 'EDIT'
            this.populate()
            
        } else {
            this.mode = 'VIEW'
            this.populate()
        }
        
        this.maxWidth = this.mode === 'VIEW' ? '1000px' : '700px'
        this.buttonName = this.mode === 'ADD' ? 'Create' : 'Update'
    },
    methods: {
        populate: function (MemberData) {
            MemberData = MemberData 
                    ? MemberData 
                    : this.$store.getters.GET_MEMBER_INFO

            if (MemberData && MemberData.address) {
                this.type = MemberData.MemberType
                this.basicDetails = mapper(MemberData, this.basicDetails)
                this.address = mapper(MemberData.address, this.address)
                this.otherDetails = mapper(MemberData, this.otherDetails)
            }
        },
        process: function () {
            const MemberData = {
                MemberType: this.type,
                active: true,
                ...this.basicDetails,
                address: {
                    ...this.address
                },
                ...this.otherDetails
            }
            if (this.mode === 'ADD') {
                this.$store.dispatch('REGISTER_MEMBER', MemberData)
            } else {
                MemberData['id'] = this.$store.getters.GET_MEMBER_INFO.id
                this.$store.dispatch('UPDATE_MEMBER', MemberData)
            }
        },
        cancel: function () {
            this.$router.go(-1)
        }
    },
    watch: {
        MemberInfo: function (newVal) {
            this.populate(newVal)
        }
    }
}
</script>

<style scoped>
.wrapper {
    margin: auto;
    border: 1px solid #b3b3b2;
    border-radius: 10px;
    padding: 30px 70px;
}
.section{
    margin-top: -25px;
}

.action {
    margin-top: 50px;
}

.btn {
    width: 140px;
    height: 40px;
}
#y{
    margin-top: 9px;
}
#web{
    display:inline-block;
}
#lb{
    margin-top: 1px;
}
#du{
    margin-bottom: 6px;
}



</style>