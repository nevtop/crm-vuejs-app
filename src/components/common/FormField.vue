<template>
  <div v-if="false"></div>
</template>

<script>
export default {
    props: {
      input: String,
      label: String, 
      map: String,
      models: {
        type: Array,
        default: () => []
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
}
</script>

<style>

</style>