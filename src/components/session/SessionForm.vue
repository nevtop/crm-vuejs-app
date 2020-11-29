<template>
    <div class="wrapper" id="a" v-bind:style="{ maxWidth: maxWidth }">
        <h2 v-if="mode === 'ADD'">Add Session</h2>
        <h2 v-else-if="mode === 'EDIT'">Edit Session</h2>
        <hr v-if="mode !== 'VIEW'">
        <form-module name="" v-bind:mode="mode" v-model="client" :key="updateKey">
            <form-field input="select" label="Associated With" map="clientId" :models="getClientSelectList" 
                :disabled="disabled"></form-field>
        </form-module>
        <form-module name="Basic Details" v-bind:mode="mode" v-model="basicDetails">
            <form-field input="text" label="Session Name" map="sessionName"></form-field>
            <form-field input="radio" label="Session Type" map="sessionType" :models="types"></form-field>
        </form-module>
        <form-module name="Address" v-bind:mode="mode" v-model="address" :disable="sameAsClientAddress">
            <div v-if="mode !== 'VIEW'" slot="form-control" class="form-control">
                <label>
                    <input type="checkbox" v-model="sameAsClientAddress">
                    same as client address
                </label>
            </div>
            <form-field input="text" label="Address Line 1" map="addressLine1"></form-field>
            <form-field input="text" label="Address Line 2" map="addressLine2"></form-field>
            <form-field input="text" label="Area" map="area"></form-field>
            <form-field input="text" label="City" map="city"></form-field>
            <form-field input="text" label="State" map="state"></form-field>
            <form-field input="text" label="Pincode" map="pincode"></form-field>
            <form-field input="text" label="Country" map="country"></form-field>
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
import Datepicker from 'vuejs-datepicker'
import { mapper } from '@/commonjs/util'

export default {
    props: {
        sessionInfo: Object
    },
    components: {
        'form-module': FormModule,
        'form-field': FormField,
        'date-picker': Datepicker
    },
    data: function () {
        return {
            mode: '',
            updateKey: 0,
            types: [
                { key: 'Regular', value: 'REGULAR' },
                { key: 'Event', value: 'EVENT' }
            ],
            client: { clientId: 0 },
            basicDetails: { sessionName: '', sessionType: '' },
            address: { addressLine1: '', addressLine2: '', city: '',
                area: '', state: '', pincode: '', country: ''
            },
            sameAsClientAddress: false,
            maxWidth: '1000px',
            buttonName: 'Create',
            disabled: false
        }
    },
    created: function () {
        switch (this.$route.name) {
            case 'AddSession':
                this.mode = 'ADD'
                break
            case 'EditSession':
                this.mode = 'EDIT'
                this.populate()
                break
            default:
                this.mode = 'VIEW'
                this.populate()
                break
        }

        /* Add session in client view */
        if (this.$route.query.clientId) {
            this.client.clientId = this.$route.query.clientId
            this.disabled = true
        }
        
        this.maxWidth = this.mode === 'VIEW' ? '1000px' : '700px'
        this.buttonName = this.mode === 'ADD' ? 'Create' : 'Update'
    },
    computed: {
        getClientSelectList: function () {
            const size = this.$store.getters.GET_CLIENT_SELECT_LIST.length
            if (size > 0) {
                this.updateKey += 1;
                return this.$store.getters.GET_CLIENT_SELECT_LIST
            }
        }
    },
    methods: {
        populate: function (data) {
            const sessionData = data 
                    ? data 
                    : this.$store.getters.GET_SESSION_INFO

            if (sessionData && sessionData.address) {
                this.sameAsClientAddress = this.mode === 'EDIT'
                        ? sessionData.sameAsClientAddress
                        : false
                this.client = {
                    clientId: sessionData.clientId
                }
                this.basicDetails = mapper(sessionData, this.basicDetails)
                this.address = mapper(sessionData.address, this.address)
            }
        },
        process: function () {
            const sessionData = {
                active: true,
                clientId: this.client.clientId,
                ...this.basicDetails,
                sameAsClientAddress: this.sameAsClientAddress,
                address: {
                    ...this.address
                },
            }
            if (this.mode === 'ADD') {
                this.$store.dispatch('CREATE_SESSION', sessionData)
            } else {
                sessionData['id'] = this.$store.getters.GET_SESSION_INFO.id
                this.$store.dispatch('UPDATE_SESSION', sessionData)
            }
        },
        cancel: function () {
            this.$router.go(-1)
        }
    },
    watch: {
        sessionInfo: function (newVal) {
            this.populate(newVal)
        }
    }
}
</script>

<style scoped>
#a{
  border-color:rgb(12, 83, 80);
}
.wrapper {
    max-width: 700px;
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
#x{
  margin-left: 100px;
}

.form-control {
    float: right;
}
</style>