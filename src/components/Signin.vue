<template>
    <div class="container-login">
        <div class="container-wrapper mt-50">
            <form>
                <span class="label-login mb-20">Login</span>
                <template v-if="isLogout">
                    <alert type="success" message="Logout successfully."></alert>
                </template>
                <template v-if="isSessionExpire">
                    <alert type="error" message="Session Expired."></alert>
                </template>
                <div class="div-field-login mb-20">
                    <input type="text" class="field-login" name="username" v-model="username" placeholder="Username" autocomplete="off"/>
                </div>
                <div class="div-field-login mb-20">
                    <input type="password" class="field-login" name="password" v-model="password" placeholder="Password"/>
                </div>
                <div class="flex-sb mb-20">
                    <div>
                        <input id="ckb" type="checkbox" name="remember-me" />
                        <label for="ckb">Remember me</label>
                    </div>
                    <div>
                        <a href="#">Forgot?</a>
                    </div>
                </div>
                <div>
                    <button type="button" class="button-login" @click="authenticateUser">Login</button>
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
            isLogout: false,
            isSessionExpire: false
        }
    },
    components: {
        'alert': Alert
    },
    methods: {
        authenticateUser: async function () {
            let data = {}
            data['username'] = this.username.trim()
            data['password'] = this.password

            await this.axios.post('http://localhost:8080/user/signin', data)
                        .then((response) => {console.log(response.data)})
                        .catch((error) => {console.log(error.data)})
            //this.$router.push('/home')
        }
    },
    mounted: function() {
        if(this.$route.query.logout)
            this.isLogout = true
        if(this.$route.query.sessionExpire)
            this.isSessionExpire = true
    }
}
</script>

<style>
.msg-logout {
    text-align: center;
    margin-top: 20px;
}
</style>
