<template>
    <div class="wrapper" v-bind:style="{ maxWidth: maxWidth }">
        <h2 v-if="mode === 'ADD'" id="du">Add User</h2>
        <h2 v-else-if="mode === 'EDIT'" id="du">Edit User</h2>
        <hr v-if="mode !== 'VIEW'">
        <form-module name="Basic Details" v-bind:mode="mode" v-model="basicDetails">
            <form-field  input="text" label="FirstName" map="firstName"></form-field>
            <form-field  input="text" label="LastName" map="lastName"></form-field>
            <form-field  input="date" label="Date Of Birth" map="dob"></form-field>
            <form-field  input="radio" label="Gender" map="gender" :models="genders"></form-field>
            <form-field  input="text" label="Mail ID" map="email"></form-field>
            <form-field  input="number" label="Contact No" map="contact"></form-field>
        </form-module>
        <div class="row">
            <div class="col-2">
                <label for="dunction_lb" class="mb-5">Department</label>
                <select class="selection" v-model="department_selected" multiple>
                    <option v-for="department in departments" v-bind:key="department.value" v-bind:value="department.value">{{ department.text }}</option>
                </select>
            </div>
            <div class="col-2">
                <label for="role_lb" class="mb-5">User Role</label>
                <select class="selection" v-model="role_selected" multiple>
                    <option v-for="role in roles" v-bind:key="role.value" v-bind:value="role.value">{{ role.text }}</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <span>Department selected: {{ department_selected }}</span>
            </div>
            <div class="col-2">
                <span>Role selected: {{ role_selected }}</span>
            </div>
        </div>
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
        userInfo: Object
    },
    components: {
        'date-picker': Datepicker,
        'form-module': FormModule,
        'form-field': FormField
    },
    data: function () {
        return {
            mode: '',
            genders: [
                { key: 'Male', value: 'MALE' },
                { key: 'Female', value: 'FEMALE' },
                { key: 'Other', value: 'OTHER' }
            ],
            basicDetails: { firstName: '', lastName: '', email:"", gender:"", contact:"", dob: new Date() },
            buttonName: 'Create',
            maxWidth: '1000px',
            departments: [
                { text: 'GENERAL', value: 0},
                { text: 'TRAINING', value: 1},
                { text: 'PRODUCT ENGINEERING', value: 2},
                { text: 'SALES', value: 3},
                { text: 'MARKETING', value: 4},
                { text: 'CUSTOMER SUPPORT', value: 5},
                { text: 'ACCOUNTS', value: 6},
                { text: 'MANAGEMENT', value: 7}
            ],
            roles: [
                { text: 'USER', value: 0},
                { text: 'EXECUTIVE', value: 1},
                { text: 'MANAGER', value: 2},
                { text: 'ADMIN', value: 3}
            ],
            department_selected: [],
            role_selected: []
        }
    },
    created: function () {
        if (this.$route.name === 'AddUser') {
            this.mode = 'ADD'
        } else if (this.$route.name === 'EditUser') {
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
        populate: function (userData) {
            userData = userData 
                    ? userData 
                    : this.$store.getters.GET_USER_INFO

            if (userData && userData.address) {
                this.basicDetails = mapper(userData, this.basicDetails)
            }
        },
        process: function () {
            const userData = {
                active: true,
                ...this.basicDetails
            }
            if (this.mode === 'ADD') {
                this.$store.dispatch('REGISTER_USER', userData)
            } else {
                userData['id'] = this.$store.getters.GET_CLIENT_INFO.id
                this.$store.dispatch('UPDATE_USER', userData)
            }
        },
        cancel: function () {
            this.$router.go(-1)
        }
    },
    watch: {
        userInfo: function (newVal) {
            this.populate(newVal)
        }
    }
}
</script>

<style scoped>

.row {
    display: flex;
    flex-wrap: wrap;
}

.col-2 {
    display: flex;
    flex-direction: column;
    width: calc((100% - 60px) / 2);
    margin: 15px;
}
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