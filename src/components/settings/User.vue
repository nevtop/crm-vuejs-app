<template>
    <div>
        <router-link :to="{ name: 'UserRegistration' }">New User</router-link>
        <router-view name="user"></router-view>
    </div>
</template>

<script>
import UserRegistration from './UserRegistration.vue'
export default {
    components: {
        'user-registration': UserRegistration
    }
}
</script>

<style>

</style>