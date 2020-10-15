<template>
    <div class="wrapper">
        <div class="section-header">Basic Details</div>
        <div class="section">
            <div class="column right-align">
                <span>Client Name:</span>
                <span>GST No:</span>
                <span>PAN No:</span>
            </div>
            <div class="column left-align">
                <span>{{ clientName }}</span>
                <span>{{ gstNo }}</span>
                <span>{{ panNo }}</span>
            </div>
        </div>
        <div class="section-header">Address</div>
        <div class="section">
            <div class="column right-align">
                <span>Address Line 1:</span>
                <span>Address Line 2:</span>
                <span>City:</span>
                <span>State:</span>
                <span>Pincode:</span>
                <span>Country:</span>
            </div>
            <div class="column left-align">
                <span>{{ addressLine1 }}</span>
                <span>{{ addressLine2 }}</span>
                <span>{{ city }}</span>
                <span>{{ state }}</span>
                <span>{{ pincode }}</span>
                <span>{{ country }}</span>
            </div>
        </div>
        <div class="section-header">Other Details</div>
        <div class="section">
            <div class="column right-align">
                <span>Website:</span>
                <span>Support Email:</span>
            </div>
            <div class="column left-align">
                <span>{{ website }}</span>
                <span>{{ supportEmail }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            clientName: 'Apple Inc',
            gstNo: 'FAJSKLF343LKSFD',
            panNo: 'KFJSF987FSA',
            addressLine1: 'WZ-749, Badiyal',
            addressLine2: 'Palam Village',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: 110045,
            country: 'India',
            website: 'www.nevtop.com',
            supportEmail: 'support@nevtop.com'
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 1100px;
    margin: auto;
}

.section-header {
    font-size: 19px;
    color: #282c33;
    font-weight: 700;
    margin: 24px 0 8px;
}

.section {
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #f2f3f5;
    padding: 15px 20px;
}

.column {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    line-height: 30px;
}

.right-align {
    align-items: flex-end;
}

.left-align {
    align-items: flex-start;
}
</style>