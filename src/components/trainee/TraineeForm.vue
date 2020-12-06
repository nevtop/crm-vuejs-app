<template>
    <div class="wrapper" v-bind:style="{ maxWidth: maxWidth }">
        <h2 v-if="mode === 'ADD'" id="du">Add Trainee</h2>
        <h2 v-else-if="mode === 'EDIT'" id="du">Edit Trainee</h2>
        <hr v-if="mode !== 'VIEW'">
        <form-module v-if="mode === 'ADD'" v-bind:mode="mode" v-model="session" :key="updateKey">
            <form-field  input="select" label="Associated with" map="sessionId" :models="getSessionSelectList"
                :disabled="disabled"></form-field>
        </form-module>
        <form-module name="Basic Details" v-bind:mode="mode" v-model="basicDetails">
            <form-field  input="text" label="First Name" map="firstName"></form-field>
            <form-field  input="text" label="Last Name" map="lastName"></form-field>
            <form-field  input="date" label="Date Of Birth" map="dob"></form-field>
            <form-field  input="radio" label="Gender" map="gender" :models="genders"></form-field>
        </form-module>
        <form-module name="Address Details" v-bind:mode="mode" v-model="address" :disable="sameAsSessionAddress">
            <div v-if="mode !== 'VIEW'" slot="form-control" class="form-control">
                <label>
                    <input type="checkbox" v-model="sameAsSessionAddress">
                    same as session address
                </label>
            </div>
            <form-field  input="text" label="Address Line 1" map="addressLine1"></form-field>
            <form-field  input="text" label="Address Line 2" map="addressLine2"></form-field>
            <form-field  input="text" label="Area" map="area"></form-field>
            <form-field  input="text" label="City" map="city"></form-field>
            <form-field  input="text" label="State" map="state"></form-field>
            <form-field  input="text" label="Pincode" map="pincode"></form-field>
            <form-field  input="text" label="Country" map="country"></form-field>
        </form-module>
        <form-module name="Contact Details" v-bind:mode="mode" v-model="contactDetails">
            <form-field  input="text" label="Primary Email" map="primaryEmail"></form-field>
            <form-field  input="text" label="Secondary Email" map="secondaryEmail"></form-field>
            <form-field  input="text" label="Primary Phone" map="primaryPhone"></form-field>
            <form-field  input="text" label="Secondary Phone" map="secondaryPhone"></form-field>
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
        traineeInfo: Object
    },
    components: {
        'form-module': FormModule,
        'form-field': FormField,
        'date-picker': Datepicker
    },
    data: function () {
        return {
            mode: '',
            updateKey: 0,
            genders: [
                { key: 'Male', value: 'MALE' },
                { key: 'Female', value: 'FEMALE' },
                { key: 'Other', value: 'OTHER' }
            ],
            session: { sessionId: 0 },
            basicDetails: { firstName: '', lastName: '', gender: '', dob: new Date().getTime() },
            address: { addressLine1: '', addressLine2: '', city: '',
                area: '', state: '', pincode: '', country: ''
            },
            contactDetails: { primaryEmail: '', secondaryEmail: '',
                primaryPhone: '', secondaryPhone: ''
            },
            sameAsSessionAddress: false,
            maxWidth: '1000px',
            buttonName: 'Create',
            disabled: false
        }
    },
    created: function () {
        switch (this.$route.name) {
            case 'AddTrainee':
                this.mode = 'ADD'
                break
            case 'EditTrainee':
                this.mode = 'EDIT'
                this.populate()
                break
            default:
                this.mode = 'VIEW'
                this.populate()
                break
        }

        if (this.$route.query.sessionId) {
            this.session.sessionId = this.$route.query.sessionId
            this.disabled = true
        }
        
        this.maxWidth = this.mode === 'VIEW' ? '1000px' : '700px'
        this.buttonName = this.mode === 'ADD' ? 'Create' : 'Update'
    },
    computed: {
        getSessionSelectList: function () {
            const size = this.$store.getters.GET_SESSION_SELECT_LIST.length
            if (size > 0) {
                this.updateKey += 1;
                return this.$store.getters.GET_SESSION_SELECT_LIST
            }
        }
    },
    methods: {
        populate: function (data) {
            const traineeData = data 
                    ? data 
                    : this.$store.getters.GET_TRAINEE_INFO
            if (traineeData && traineeData.profile && traineeData.profile.address) {
                this.sameAsSessionAddress = this.mode === 'EDIT'
                        ? traineeData.sameAsSessionAddress
                        : false
                
                let options = { year: 'numeric', month: 'long', day: 'numeric'}
                traineeData.profile.dob = this.mode === 'VIEW'
                    ? new Date(traineeData.profile.dob).toLocaleDateString("en-GB", options)
                    : new Date(traineeData.profile.dob).getTime()
                    
                this.session.sessionId = traineeData.sessionId
                this.basicDetails = mapper(traineeData.profile, this.basicDetails)
                this.address = mapper(traineeData.profile.address, this.address)
                this.contactDetails = mapper(traineeData.profile, this.contactDetails)
            }
        },
        process: function () {
            const traineeData = {
                sessionId: this.session.sessionId,
                active: true,
                profile: {
                    ...this.basicDetails,
                    ...this.contactDetails
                },
                address: this.address,
                sameAsSessionAddress: this.sameAsSessionAddress
            }
            if (this.mode === 'ADD') {
                this.$store.dispatch('REGISTER_TRAINEE', traineeData)
            } else {
                traineeData['id'] = this.$store.getters.GET_TRAINEE_INFO.id
                this.$store.dispatch('UPDATE_TRAINEE', traineeData)
            }
        },
        cancel: function () {
            this.$router.go(-1)
        }
    },
    watch: {
        traineeInfo: function (newVal) {
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
.form-control {
    float: right;
}
</style>