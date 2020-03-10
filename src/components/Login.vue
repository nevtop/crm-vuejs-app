<template>
  <div class="container-login">
    <div class="container-wrapper mt-50">
      <form>
        <span class="label-login mb-20">Login</span>
        <div class="div-field-login mb-20">
          <input
            type="text"
            class="field-login"
            name="username"
            placeholder="Username"
            autocomplete="off"
            required
          />
        </div>
        <div class="div-field-login mb-20">
          <input type="password" class="field-login" name="pass" placeholder="Password" required />
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
          <button class="button-login" @click="goHome">Login</button>
        </div>
      </form>
      <div v-if="logout" class="div-logout">Logout Successfully!</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['logout'],
  methods: {
    goHome: function () {
      this.$router.push('/home')
    }
  }
}
</script>

<style>
.div-logout {
  text-align: center;
  margin-top: 20px;
}
</style>
