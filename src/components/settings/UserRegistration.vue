<template>
    <div>
        <h2>User Registration</h2>
        <form>
            <div class="row">
                <div class="col-2">
                    <label for="fname_lb">First Name</label>
                    <input type="text" v-model="fname">
                </div>
                <div class="col-2">
                    <label for="lname_lb">Last Name</label>
                    <input type="text" v-model="lname">
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <label for="dob_lb">Date of Birth</label>
                    <date-picker></date-picker>
                </div>
                <div class="col-2">
                    <label for="gender_lb">Gender</label>
                    <input type="radio" value="male" v-model="gender">
                    <label for="male_lb">Male</label>
                    <input type="radio" value="female" v-model="gender">
                    <label for="female_lb">Female</label>
                </div>
                <div class="row">
                    <div class="col-2">
                        <label for="email_lb">Email</label>
                        <input type="text" v-model="email">
                    </div>
                    <div class="col-2">
                        <label for="phoneno_lb">Phone Number</label>
                        <input type="text" v-model="phoneno">
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <label for="dunction_lb">Department</label>
                        <select v-model="department_selected" multiple>
                            <option v-for="department in departments" v-bind:key="department.value" v-bind:value="department.value">{{ department.text }}</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <label for="role_lb">User Role</label>
                        <select v-model="role_selected" multiple>
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
                <div class="row">
                    <div class="col-2">
                        <button type="button">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
    data: function () {
        return {
            fname: '',
            lname: '',
            gender: '',
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
    components: {
        'date-picker': Datepicker
    }
}
</script>

<style>

</style>