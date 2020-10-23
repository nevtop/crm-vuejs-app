<template>
    <div class="wrapper">
        <h2>Client Registration</h2>
        <div class="section">
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
        <div class="section-header">Basic Details</div>
        <div class="section">
            <div class="column right-align" id="t">
                <span>Client Name:</span>
                <span>GST No:</span>
                <span>PAN No:</span>
            </div>
            <div class="column left-align">
                <input type="text" class="input-field" v-model="name">
                <input type="text" class="input-field" v-model="gst">
                <input type="text" class="input-field" v-model="pan">
            </div>
        </div>
        <div class="section-header">Address</div>
        <v-address></v-address>
        <div class="section-header">Other Details</div>
        <div class="section">
            <div class="column right-align">
                <span>Website:</span>
                <span>Support Email:</span>
            </div>
            <div class="column left-align">
                <input type="text" class="input-field" v-model="website">
                <input type="text" class="input-field" v-model="supportEmail">
            </div>
        </div>
        <div class="action">
            <button type="button" class="btn" v-on:click="register">Create</button>
            <button type="button" class="btn" v-on:click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
import Address from '@/components/Address'

export default {
    data: function () {
        return {
            type: '',
            name: '',
            gst: '',
            pan: '',
            website: '',
            supportEmail: ''
        }
    },
    components: {
        'v-address': Address
    },
    methods: {
        register: function () {
            const clientData = {
                clientType: this.type,
                clientName: this.name.trim(),
                active: true,
                panNo: this.pan.trim(),
                gstNo: this.gst.trim(),
                website: this.website.trim(),
                supportEmail: this.supportEmail.trim(),
                address: {
                    addressLine1: this.$children[0].$data.addressLine1, 
                    addressLine2: this.$children[0].$data.addressLine2,
                    city: this.$children[0].$data.city,
                    state: this.$children[0].$data.state,
                    pincode: this.$children[0].$data.pincode,
                    country: this.$children[0].$data.country
                }
            }
            this.$store.dispatch('REGISTER_CLIENT', clientData)
        },
        cancel: function () {
            this.$router.go(-1)
        }
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

.action {
    margin-top: 50px;
}

.btn {
    width: 140px;
    height: 40px;
}

</style>