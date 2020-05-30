<template>
    <div class="container-login">
        <div class="container-wrapper mt-50">
            <form>
                <span class="label-login mb-20">Login</span>
                <template v-if="showAlert">
                    <alert v-bind:type="alertType" v-bind:message="alertMessage" v-on:closeAlertEvent="closeAlertBox"></alert>
                </template>
                <div class="div-field-login mb-20">
                    <input type="text" class="field-login" name="username" v-model="username" placeholder="Username" autocomplete="off"/>
                </div>
                <div class="div-field-login mb-20">
                    <input v-bind:type="showPassword ? 'text' : 'password'" class="field-login" name="password" v-model="password" placeholder="Password"/>
                </div>
                <div class="flex-sb mb-20">
                    <div>
                        <input type="checkbox" name="remember-me" v-model="showPassword"/>
                        <label for="showPassword">Show password</label>
                    </div>
                </div>
                <div>
                    <button type="button" class="button-login" @click="authenticateUser">Login</button>
                </div>
                <div class="flex-sb mt-50">
                    <div>
                        <input type="checkbox" name="remember-me" />
                        <label for="rememberme">Remember me</label>
                    </div>
                    <div>
                        <a href="#">Forgot?</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Alert from '@/components/common/Alert'

export default {
    data: function () {
        return {
            username: '',
            password: '',
            showPassword: false,
            showAlert: false,
            alertType: '',
            alertMessage: ''
        }
    },
    components: {
        'alert': Alert
    },
    computed: {},
    methods: {
        authenticateUser: function () {
            const credentials = {
                username: this.username.trim(),
                password: this.password
            }
            this.$store.dispatch('AUTHENTICATE_USER', credentials)
        },
        closeAlertBox: function (boolval) {
            this.showAlert = false
        },
        computeAlertTypeAndMessage: function () {
            switch(Object.keys(this.$route.query)[0]) {
                case 'logout': 
                    this.showAlert = true
                    this.alertType = 'success'
                    this.alertMessage = 'Logout successfully.'
                    break;
                case 'sessionExpired':
                    this.showAlert = true
                    this.alertType = 'error'
                    this.alertMessage = 'Session expired.'
                    break;
                case 'invalidCredentials':
                    this.showAlert = true
                    this.alertType = 'error'
                    this.alertMessage = 'Invalid username or password.'
                    break;
                default:
                    this.showAlert = false
            }
        }
    },
    watch: {
        $route (to, from) {
            this.computeAlertTypeAndMessage()
        }
    },
    created: function() {
        this.computeAlertTypeAndMessage()
    }
}
</script>

<style>
.msg-logout {
    text-align: center;
    margin-top: 20px;
}
</style>
