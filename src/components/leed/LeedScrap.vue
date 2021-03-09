<template>
    <div class="wrapper" style="max-width: 700px;">
        <h3>Scrap Leed</h3>
        <hr>
        <div v-for="(reason, index) in reasons" :key="index">
            <input type="radio" :value="reason.value" v-model="scrapValue">
            <label :for="reason.value">{{ reason.key }}</label>
        </div>
        <template v-if="scrapValue === otherValue">
            <input type="text" v-model="comment" placeholder="Write a reason">
        </template>
        <div style="float: right;">
            <button type="button" @click="$emit('submit-scrap', scrapValue)">Submit</button>
            <button type="button" @click="$emit('close-scrap')">Cancel</button>
        </div>
        <div class="mb-10"></div>
    </div>
</template>

<script>
import { ScrapReasons } from '@/commonjs/constants'

export default {
    props: ['stage'],
    data: function () {
        return {
            scrapValue: '-1',
            hello:[],
            reasons: [],
            otherValue: null,
            comment: ''
        }
    },
    created: function () {
        this.reasons = ScrapReasons[parseInt(this.stage)]
        const len = this.reasons.length
        this.otherValue = this.reasons[len-1].value
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 700px;
    margin: auto;
    border: 1px solid #b3b3b2;
    border-radius: 10px;
    padding: 30px 70px;
}

input[type="radio"]{
   appearance: none;
   border: 1px solid #d3d3d3;
   width: 25px;
   height: 25px;
   content: none;
   outline: none;
   margin: 0;
}

input[type="radio"]:checked {
  appearance: none;
  outline: none;
  padding: 0;
  content: none;
  border: none;
}

input[type="radio"]:checked::before{
  position: absolute;
  color: green !important;
  content: "\00A0\2713\00A0" !important;
  border: 1px solid #d3d3d3;
  font-weight: bolder;
  font-size: 18px;
}
</style>