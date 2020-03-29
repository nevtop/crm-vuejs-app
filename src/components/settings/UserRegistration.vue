<template>
    <div class="wrapper">
        <h2 class="ml-10">User Registration</h2>
        <form>
            <div class="row">
                <div class="col-2">
                    <label for="fname_lb" class="mb-5">First Name</label>
                    <input type="text" class="input-field" v-model="fname">
                </div>
                <div class="col-2">
                    <label for="lname_lb" class="mb-5">Last Name</label>
                    <input type="text" class="input-field" v-model="lname">
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <label for="dob_lb" class="mb-5">Date of Birth</label>
                    <date-picker input-class="input-date" calendar-class="input-date" wrapper-class="input-date"></date-picker>
                </div>
                <div class="col-2">
                    <label for="gender_lb" class="mb-5">Gender</label>
                    <div class="mt-5">
                        <span class="mr-10">
                            <input type="radio" value="male" v-model="gender">
                            <label for="male_lb">Male</label>
                        </span>
                        <span>
                            <input type="radio" value="female" v-model="gender">
                            <label for="female_lb">Female</label>
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <label for="email_lb" class="mb-5">Email</label>
                    <input type="text" class="input-field" v-model="email">
                </div>
                <div class="col-2">
                    <label for="phoneno_lb" class="mb-5">Phone Number</label>
                    <input type="text" class="input-field" v-model="phoneno">
                </div>
            </div>
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
            <div class="row">
                <div class="col-2">
                    <button type="button" class="btn">Create</button>
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
            email: '',
            phoneno: '',
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

.col-2 {
    display: flex;
    flex-direction: column;
    width: calc((100% - 60px) / 2);
    margin: 15px;
}

.input-field {
    height: 40px;
}

.input-date {
    width: 320px;
    height: 40px;
}

.selection {
    height: 150px;
}

.btn {
    width: 150px;
    height: 40px;
}

</style>