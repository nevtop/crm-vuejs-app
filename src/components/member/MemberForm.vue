<template>
    <div class="wrapper" v-bind:style="{ maxWidth: maxWidth }">
        <h2 v-if="mode === 'ADD'" id="du">Add Member</h2>
        <h2 v-else-if="mode === 'EDIT'" id="du">Edit Member</h2>
        <hr v-if="mode !== 'VIEW'">
        <form-module name="" v-bind:mode="mode" v-model="session">
            <form-field  input="select" label="Associated with" map="sessionId"></form-field>
        </form-module>
        <form-module name="Basic Details" v-bind:mode="mode" v-model="basicDetails">
            <form-field  input="text" label="FirstName" map="firstName"></form-field>
            <form-field  input="text" label="LastName" map="lastName"></form-field>
            <form-field  input="date" label="Date Of Birth" map="dob"></form-field>
            <form-field  input="radio" label="Gender" map="gender" :models="genders"></form-field>
        </form-module>
        <form-module name="Address Details" v-bind:mode="mode" v-model="address">
            <form-field  input="text" label="Address Line 1" map="addressLine1"></form-field>
            <form-field  input="text" label="Address Line 2" map="addressLine2"></form-field>
            <form-field  input="text" label="Area" map="area"></form-field>
            <form-field  input="text" label="City" map="city"></form-field>
            <form-field  input="text" label="State" map="state"></form-field>
            <form-field  input="text" label="Pincode" map="pincode"></form-field>
            <form-field  input="text" label="Country" map="country"></form-field>
        </form-module>
        <form-module name="Other Details" v-bind:mode="mode" v-model="contactDetails">
            <form-field  input="text" label="Primary Email Address" map="primaryemailaddress"></form-field>
            <form-field  input="text" label="Secondary Email Address" map="secondaryemailaddress"></form-field>
            <form-field  input="text" label="Primary Phone Number" map="primaryphonenumber"></form-field>
            <form-field  input="text" label="Secondary Phone Number" map="secondaryphonenumber"></form-field>
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
            mode: '',
            genders: [
                { key: 'Male', value: 'MALE' },
                { key: 'Female', value: 'FEMALE' },
                { key: 'Other', value: 'OTHER' }
            ],
            session: { sessionId: '' },
            basicDetails: { FirstName: '', LastName: '', gender: '', dob: new Date() },
            address: { addressLine1: '', addressLine2: '', city: '',
                area: '', state: '', pincode: '', country: ''
            },
            contactDetails: { primaryemailaddress: '', secondaryemailaddress: '',
                primaryphonenumber: '', secondaryphonenumber: ''
            },
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
        populate: function (memberData) {
            memberData = memberData 
                    ? memberData 
                    : this.$store.getters.GET_MEMBER_INFO

            if (memberData && memberData.address) {
                this.member.sessionId = memberData.sessionId
                this.basicDetails = mapper(memberData, this.basicDetails)
                this.address = mapper(memberData.address, this.address)
                this.contactDetails = mapper(memberData, this.otherDetails)
            }
        },
        process: function () {
            const memberData = {
                sessionId: this.session.sessionId,
                active: true,
                ...this.basicDetails,
                address: {
                    ...this.address
                },
                ...this.contactDetails
            }
            if (this.mode === 'ADD') {
                this.$store.dispatch('REGISTER_MEMBER', memberData)
            } else {
                memberData['id'] = this.$store.getters.GET_MEMBER_INFO.id
                this.$store.dispatch('UPDATE_MEMBER', memberData)
            }
        },
        cancel: function () {
            this.$router.go(-1)
        }
    },
    watch: {
        memberInfo: function (newVal) {
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