<template>
    <div class="wrapper" v-bind:style="{ maxWidth: maxWidth }">
        <h2 v-if="mode === 'ADD'">Add Client</h2>
        <h2 v-else-if="mode === 'EDIT'">Edit Client</h2>
        <hr>
        <div v-if="mode !== 'VIEW'" class="section">
            <div class="column right-align">
                <label for="client_type">Client Type:</label>
            </div>
            <div class="column left-align" id="y">
                <select v-model="type">
                    <option disabled value="">Please select one</option>
                    <option value="PERSONAL">Personal</option>
                    <option value="CORPORATE">Corporate</option>
                </select>
            </div>
        </div>
        <form-module name="Basic Details" v-bind:mode="mode" v-model="basicDetails">
            <form-field input="text" label="Client Name" map="clientName"></form-field>
            <form-field input="text" label="GST No" map="gstNo"></form-field>
            <form-field input="text" label="PAN No" map="panNo"></form-field>
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
            <form-field input="text" label="Website" map="website"></form-field>
            <form-field input="text" label="Support Email" map="supportEmail"></form-field>
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
        clientInfo: Object
    },
    components: {
        'form-module': FormModule,
        'form-field': FormField
    },
    data: function () {
        return {
            type: '',
            mode: '',
            basicDetails: { clientName: '', gstNo: '', panNo: '' },
            address: { addressLine1: '', addressLine2: '', city: '',
                area: '', state: '', pincode: '', country: ''
            },
            otherDetails: { website: '', supportEmail: '' },
            maxWidth: '1000px',
            buttonName: 'Create'
        }
    },
    created: function () {
        if (this.$route.name === 'AddClient') {
            this.mode = 'ADD'
        } else if (this.$route.name === 'EditClient') {
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
        populate: function (clientData) {
            clientData = clientData 
                    ? clientData 
                    : this.$store.getters.GET_CLIENT_INFO

            if (clientData && clientData.address) {
                this.type = clientData.clientType
                this.basicDetails = mapper(clientData, this.basicDetails)
                this.address = mapper(clientData.address, this.address)
                this.otherDetails = mapper(clientData, this.otherDetails)
            }
        },
        process: function () {
            const clientData = {
                clientType: this.type,
                active: true,
                ...this.basicDetails,
                address: {
                    ...this.address
                },
                ...this.otherDetails
            }
            if (this.mode === 'ADD') {
                this.$store.dispatch('REGISTER_CLIENT', clientData)
            } else {
                clientData['id'] = this.$store.getters.GET_CLIENT_INFO.id
                this.$store.dispatch('UPDATE_CLIENT', clientData)
            }
        },
        cancel: function () {
            this.$router.go(-1)
        }
    },
    watch: {
        clientInfo: function (newVal) {
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