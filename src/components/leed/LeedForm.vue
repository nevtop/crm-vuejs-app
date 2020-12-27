<template>
    <div class="wrapper" v-bind:style="{ maxWidth: maxWidth }">
        <h2 v-if="mode === 'ADD'">Add Leed</h2>
        <h2 v-else-if="mode === 'EDIT'">Edit Leed</h2>
        <hr v-if="mode !== 'VIEW'">
        <form-module name="Basic Details" v-bind:mode="mode" v-model="basicDetails">
            <form-field input="text" label="Leed Name" map="leedName"></form-field>
            <form-field input="select" label="Source" map="source" :models="sources"></form-field>
            <form-field input="radio" label="Gender" map="gender" :models="genders"></form-field>
            <form-field input="text" label="Email ID" map="email"></form-field>
            <form-field input="number" label="Phone No" map="phone"></form-field>
        </form-module>
        <form-module name="Address" v-bind:mode="mode" v-model="address">
            <form-field input="text" label="Address Line 1" map="addressLine1"></form-field>
            <form-field input="text" label="Address Line 2" map="addressLine2"></form-field>
            <form-field input="text" label="Area" map="area"></form-field>
            <form-field input="text" label="City" map="city"></form-field>
            <form-field input="text" label="State" map="state"></form-field>
            <form-field input="text" label="Pincode" map="pincode"></form-field>
            <form-field input="text" label="Country" map="country"></form-field>
        </form-module>
        <form-module name="Other Details" v-bind:mode="mode" v-model="otherDetails">
            <form-field input="textarea" label="Description" map="description"></form-field>
        </form-module>
        <div v-if="mode !== 'VIEW'" class="action">
            <button type="button" class="btn" v-on:click="process">{{ buttonName }}</button>
            <button type="button" class="btn" v-on:click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import FormModule from '@/components/common/FormModule'
import FormField from '@/components/common/FormField'
import { mapper } from '@/commonjs/util'

export default {
    props: {
        leedInfo: Object
    },
    components: {
        'form-module': FormModule,
        'form-field': FormField
    },
    data: function () {
        return {
            mode: '',
            sources: [
                { key: 'Gmail', value: 'GMAIL' },
                { key: 'Urban Pro', value: 'URBAN_PRO' },
                { key: 'Sulekha', value: 'SULEKHA' },
                { key: 'Just Dial', value: 'JUST_DIAL' }
            ],
            genders: [
                { key: 'Male', value: 'MALE' },
                { key: 'Female', value: 'FEMALE' },
                { key: 'Other', value: 'OTHER' }
            ],
            basicDetails: { leedName: '', source: '', gender: '', email: '', phone: '' },
            address: { addressLine1: '', addressLine2: '', city: '',
                area: '', state: '', pincode: '', country: ''
            },
            otherDetails: { description: '' },
            maxWidth: '1000px',
            buttonName: 'Create'
        }
    },
    created: function () {
        if (this.$route.name === 'AddLeed') {
            this.mode = 'ADD'
        } else if (this.$route.name === 'EditLeed') {
            this.mode = 'EDIT'
            this.populate()
            
        } else {
            this.mode = 'VIEW'
            this.populate()
        }
        
        this.maxWidth = this.mode === 'VIEW' ? '1000px' : '700px'
        this.buttonName = this.mode === 'ADD' ? 'Create' : 'Update'
    },
    methods: {
        populate: function (data) {
            const leedData = data 
                    ? data 
                    : this.$store.getters.GET_LEED_INFO

            if (leedData && leedData.address) {
                this.basicDetails = mapper(leedData, this.basicDetails)
                this.address = mapper(leedData.address, this.address)
                this.otherDetails = mapper(leedData, this.otherDetails)
            }
        },
        process: function () {
            const leedData = {
                active: true,
                ...this.basicDetails,
                address: {
                    ...this.address
                },
                ...this.otherDetails
            }
            if (this.mode === 'ADD') {
                this.$store.dispatch('CREATE_LEED', leedData)
            } else {
                leedData['id'] = this.$store.getters.GET_LEED_INFO.id
                this.$store.dispatch('UPDATE_LEED', leedData)
            }
        },
        cancel: function () {
            this.$router.go(-1)
        }
    },
    watch: {
        leedInfo: function (newVal) {
            this.populate(newVal)
        }
    }
}
</script>

<style scoped>
.wrapper {
    margin: auto;
    border: 1px solid #b3b3b2;
    border-radius: 10px;
    padding: 30px 70px;
}

.action {
    margin-top: 50px;
}

.btn {
    width: 140px;
    height: 40px;
}
#y{
    margin-top: 9px;
}
</style>