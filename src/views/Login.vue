<template>
    <div class="container-login">
        <div class="container-wrapper mt-50">
            <form>
                <span class="label-login mb-20">Login</span>
                <template v-if="showalert">
                    <alert v-bind:type="alert_type" v-bind:message="alert_message" v-on:closeAlertEvent="closeAlertBox"></alert>
                </template>
                <div class="div-field-login mb-20">
                    <input type="text" class="field-login" name="username" v-model="username" placeholder="Username" autocomplete="off"/>
                </div>
                <div class="div-field-login mb-20">
                    <input v-bind:type="showpass ? 'text' : 'password'" class="field-login" name="password" v-model="password" placeholder="Password"/>
                </div>
                <div class="flex-sb mb-20">
                    <div>
                        <input type="checkbox" name="remember-me" v-model="showpass"/>
                        <label for="showpass">Show password</label>
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
import { sendRequest } from '@/vuejs/vue-axios'

export default {
    data: function () {
        return {
            username: '',
            password: '',
            showpass: false,
            showalert: false,
            alert_type: '',
            alert_message: ''
        }
    },
    components: {
        'alert': Alert
    },
    computed: {},
    methods: {
        authenticateUser: async function () {
            let config = {}
            config['_method'] = 'post'
            config['_url'] = '/user/login'
            
            let data = {}
            data['username'] = this.username.trim()
            data['password'] = this.password

            config['_data'] = data

            try {
                let response = await sendRequest(config)
                this.$router.push({name: 'Home'})
            } catch(err) {
                this.$router.push({name: 'Login', query: { invalidCredentials: true }})
            }
        },
        closeAlertBox: function (boolval) {
            this.showalert = false
        },
        computeAlertTypeAndMessage: function () {
            if(this.$route.query.logout) {
                this.showalert = true
                this.alert_type = 'success'
                this.alert_message = 'Logout successfully.'
            } else if(this.$route.query.sessionExpire) {
                this.showalert = true
                this.alert_type = 'error'
                this.alert_message = 'Session expired.'
            } else if(this.$route.query.invalidCredentials) {
                this.showalert = true
                this.alert_type = 'error'
                this.alert_message = 'Invalid username or password.'
            }
        }
    },
    watch: {
        $route (to, from) {
            this.computeAlertTypeAndMessage()
        }
    },
    created: function() {
        this.computeAlertTypeAndMessage();
    }
}
</script>

<style>
.msg-logout {
    text-align: center;
    margin-top: 20px;
}
</style>
