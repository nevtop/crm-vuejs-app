<template>
    <div id="app">
        <user-registration></user-registration>
    </div>
</template>

<script>
import Test from './Test'
import UserRegistration from './components/settings/UserRegistration.vue'

export default {
    data: function () {
        return {}
    },
    components: {
        'test': Test,
        'user-registration': UserRegistration
    }
}
</script>

<style>
@import './styles/main.css';
@import './styles/util.css';
</style>
