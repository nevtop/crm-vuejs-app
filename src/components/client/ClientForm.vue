<template>
    <div class="wrapper">
        <h2 v-if="mode === 'ADD'">Add Client</h2>
        <h2 v-else-if="mode === 'EDIT'">Edit Client</h2>
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
            <form-field label="Client Name" map="clientName"></form-field>
            <form-field label="GST No" map="gstNo"></form-field>
            <form-field label="PAN No" map="panNo"></form-field>
        </form-module>
        <form-module name="Address" v-bind:mode="mode" v-model="address">
            <form-field label="Address Line 1" map="addressLine1"></form-field>
            <form-field label="Address Line 2" map="addressLine2"></form-field>
            <form-field label="City" map="city"></form-field>
            <form-field label="State" map="state"></form-field>
            <form-field label="Pincode" map="pincode"></form-field>
            <form-field label="Country" map="country"></form-field>
        </form-module>
        <form-module name="Other Details" v-bind:mode="mode" v-model="otherDetails">
            <form-field label="Website" map="website"></form-field>
            <form-field label="Support Email" map="supportEmail"></form-field>
        </form-module>
        <div v-if="mode !== 'VIEW'" class="action">
            <button type="button" class="btn" v-on:click="register">Create</button>
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
            address: {
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                pincode: '',
                country: ''
            },
            otherDetails: { website: '', supportEmail: '' }
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
    },
    methods: {
        populate: function () {
            const clientInfo = this.$store.getters.GET_CLIENT_INFO
            this.basicDetails = mapper(clientInfo, this.basicDetails)
            this.address = mapper(clientInfo.address, this.address)
            this.otherDetails = mapper(clientInfo, this.otherDetails)
        },
        register: function () {
            const clientData = {
                clientType: this.type,
                active: true,
                ...this.basicDetails,
                address: {
                    ...this.address
                },
                ...this.otherDetails
            }
            this.$store.dispatch('REGISTER_CLIENT', clientData)
        },
        cancel: function () {
            this.$router.go(-1)
        }
    },
    watch: {
        clientInfo: function (newVal) {
            this.populate()
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 1000px;
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

</style>