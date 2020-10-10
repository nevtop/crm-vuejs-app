<template>
  <div>
      <tab-nav v-bind:tabs="tabs" v-bind:selected="selected" v-on:select-tab="selectTab"/>
      <div>Hello</div>
  </div>
</template>

<script>
import TabNav from '@/components/common/TabNav'

export default {
    components: {
        'tab-nav': TabNav
    },
    data: function () {
        return {
            selected: 'Profile',
            tabs: ['Profile', 'Sessions']
        }
    },
    methods: {
        selectTab: function (tab) {
            this.selected = tab;
        } 
    }
}
</script>

<style>

</style>