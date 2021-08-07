<template>
    <div class="invoice-container">
        <div class="flex-column invoice-info">
            <span class="invoice-no">INVOICE #{{ invoiceNo }}</span>
            <span class="table-row">
                <label class="table-cell">Invoice Date</label>
                <span class="table-cell">
                    <date-picker v-model="invoiceDate"/>
                </span>
            </span>
            <span class="table-row">
                <label class="table-cell">Due Date</label>
                <span class="table-cell">
                    <date-picker v-model="dueDate"/>
                </span>
            </span>
        </div>

        <div style="display: flex;">
            <img src="@/assets/nevtop_logo.png" />
            <div class="vertical-line"></div>
            <div class="flex-column pl-15">
                <span class="company-name">Nevtop Infotour Private Limited</span>
                <span>WZ – 610/1, Raj Nagar – I</span>
                <span>Palam Colony, New Delhi – 110045</span>
                <span style="line-height: 35px;">
                    <a target="_blank" href="https://www.nevtop.com/">www.nevtop.com</a>
                </span>
                <span>(+91) 79825-24181</span>
            </div>
        </div>

        <hr>

        <div class="flex-sb">
            <div>
                <div style="margin: 25px 0px 10px 0px">
                    <label style="font-size: 15px; font-weight: bold;">Billed To</label>
                </div>
                <div class="select-box mt-10 p-3-rem" style="width: 350px;" @click="selectClientBox">
                    <font-awesome-icon icon="plus" size="2x" transform="down-2 shrink-4"/>
                    <span class="ml-10" style="font-size: 20px;">Add a Client</span>
                </div>
            </div>

            <div>
                <div style="margin: 25px 0px 10px 0px">
                    <label style="font-size: 15px; font-weight: bold;">Pay To</label>
                </div>
                <div class="pay-to mt-10 p-3-rem">
                    <span class="table-row">
                        <label class="table-cell">Bank Name</label>
                        <label class="table-cell">Kotak Mahindra Bank</label>
                    </span>
                    <span class="table-row">
                        <label class="table-cell">Account Name</label>
                        <label class="table-cell">Nevtop Infotour Private Limited</label>
                    </span>
                    <span class="table-row">
                        <label class="table-cell">Account Number</label>
                        <label class="table-cell">5487654651321654</label>
                    </span>
                    <span class="table-row">
                        <label class="table-cell">IFSC</label>
                        <label class="table-cell">KKBK00001745</label>
                    </span>
                    <span class="table-row">
                        <label class="table-cell">GST Number</label>
                        <label class="table-cell">DKFJA878S9F7ASFASD8F</label>
                    </span>
                    <span class="table-row">
                        <label class="table-cell">PAN Number</label>
                        <label class="table-cell">KSJFSDF87S98</label>
                    </span>
                </div>
            </div>
        </div>

        <template v-if="modalBox">
            <modal title="Add a Client" @close="$store.dispatch('OPEN_MODAL_BOX', false)">
                <div slot="content">
                    <input type="text" placeholder="Search a Client...">
                    <div class="invoice-items mt-25">
                        <div class="table-row field-pad">
                            <label for="">Client Name</label>
                            <input type="text" name="" id="" style="width: 100%;">
                        </div>
                    </div>
                    <div class="invoice-items">
                        <div class="table-row field-pad">
                            <div class="table-cell field-pad" style="width: 50%">
                                <label for="">Email</label>
                                <input type="text" name="" id="" style="width: 100%;">
                            </div>
                            <div class="table-cell field-pad" style="width: 50%">
                                <label for="">Phone</label>
                                <input type="text" name="" id="" style="width: 100%;">
                            </div>
                        </div>

                        <div class="table-row">
                            <div class="table-cell field-pad" style="width: 50%">
                                <label for="">Address Line 1</label>
                                <input type="text" name="" id="" style="width: 100%;">
                            </div>
                            <div class="table-cell field-pad" style="width: 50%">
                                <label for="">Address Line 2</label>
                                <input type="text" name="" id="" style="width: 100%;">
                            </div>
                        </div>

                        <div class="table-row">
                            <div class="table-cell field-pad" style="width: 50%">
                                <label for="">Area</label>
                                <input type="text" name="" id="" style="width: 100%;">
                            </div>
                            <div class="table-cell field-pad" style="width: 50%">
                                <label for="">City</label>
                                <input type="text" name="" id="" style="width: 100%;">
                            </div>
                        </div>

                        <div class="table-row">
                            <div class="table-cell field-pad" style="width: 50%">
                                <label for="">State</label>
                                <input type="text" name="" id="" style="width: 100%;">
                            </div>
                            <div class="table-cell field-pad" style="width: 50%">
                                <label for="">Country</label>
                                <input type="text" name="" id="" style="width: 100%;">
                            </div>
                        </div>
                    </div>
                    <div class="invoice-items">
                        <div class="table-row">
                            <div class="table-cell field-pad" style="width: 50%;">
                                <label for="">Pincode</label>
                                <input type="text" name="" id="" style="width: 100%;">
                            </div>
                            <div class="table-cell" style="width: 50%;"></div>
                        </div>
                    </div>
                    <button class="invoice-button mt-10">DONE</button>
                </div>
            </modal>
        </template>

        <div class="invoice-items mt-50">
            <div class="invoice-head">
                <div class="invoice-cell" style="width: 30%">Service</div>
                <div class="invoice-cell" style="width: 40%">Description</div>
                <div class="invoice-cell" style="width: 10%">Rate</div>
                <div class="invoice-cell" style="width: 10%">Quantity</div>
                <div class="invoice-cell" style="width: 10%">Amount</div>
            </div>
            <div v-for="item in invoiceItems" :key="item.id" class="invoice-row">
                <div class="invoice-cell" style="width: 30%">{{ item.service }}</div>
                <div class="invoice-cell" style="width: 40%">{{ item.description }}</div>
                <div class="invoice-cell" style="width: 10%">{{ item.rate }}</div>
                <div class="invoice-cell" style="width: 10%">{{ item.quantity }}</div>
                <div class="invoice-cell" style="width: 10%">{{ item.amount }}</div>
            </div>
            <div class="invoice-row">
                <div class="invoice-cell" style="width: 30%"><input type="text" placeholder="Service"></div>
                <div class="invoice-cell" style="width: 40%"><input type="text" placeholder="Decription"></div>
                <div class="invoice-cell" style="width: 10%"><input type="text" placeholder="Rate"></div>
                <div class="invoice-cell" style="width: 10%"><input type="text" placeholder="Quantity"></div>
                <div class="invoice-cell" style="width: 10%"><input type="text" placeholder="Amount" readonly="true"></div>
            </div>
        </div>

        <div class="select-box mt-10 mb-10 p-1-rem">
            <font-awesome-icon icon="plus" size="2x" transform="down-2 shrink-4"/>
            <span class="ml-10" style="font-size: 20px;">Add an Item</span>
        </div>

        <div class="invoice-items">
            <div class="invoice-head">
                <div class="invoice-summary-cell" style="width: 90%">Subtotal (INR)</div>
                <div class="invoice-cell" style="width: 10%">12800</div>
            </div>
            <div class="invoice-head">
                <div class="invoice-summary-cell" style="width: 90%">Discount</div>
                <div class="invoice-cell" style="width: 10%">0</div>
            </div>
            <div class="invoice-head">
                <div class="invoice-summary-cell" style="width: 90%">Total Amount (INR)</div>
                <div class="invoice-cell" style="width: 10%">12800</div>
            </div>
        </div>

        <div style="margin: 25px 0px 10px 0px">
            <label style="font-size: 15px; font-weight: bold;">Transactions</label>
        </div>

        <div class="invoice-items mt-25">
            <div class="invoice-head">
                <div class="invoice-cell" style="width: 20%">Transaction Date</div>
                <div class="invoice-cell" style="width: 30%">Transaction ID</div>
                <div class="invoice-cell" style="width: 30%">Transaction Mode</div>
                <div class="invoice-cell" style="width: 20%">Transaction Amount</div>
            </div>
            <div class="invoice-row">
                <div class="invoice-cell" style="width: 20%"><date-picker v-model="dueDate" placeholder="Transaction Date"/></div>
                <div class="invoice-cell" style="width: 30%"><input type="text" placeholder="Transaction ID"></div>
                <div class="invoice-cell" style="width: 30%">
                    <select name="" id="">
                        <option value="">PayTm</option>
                        <option value="">Cash</option>
                        <option value="">Internet Banking</option>
                        <option value="">UPI</option>
                    </select>
                </div>
                <div class="invoice-cell" style="width: 20%"><input type="text" placeholder="Transaction Amount"></div>
            </div>
            <template v-if="transactionItems.length">
                <div v-for="item in transactionItems" :key="item.id" class="invoice-row">
                    <div class="invoice-cell" style="width: 20%">{{ item.date }}</div>
                    <div class="invoice-cell" style="width: 30%">{{ item.transactionId }}</div>
                    <div class="invoice-cell" style="width: 30%">{{ item.mode }}</div>
                    <div class="invoice-cell" style="width: 20%">{{ item.amount }}</div>
                </div>
            </template>
            <template v-else>
                <div class="invoice-row">
                    <div class="invoice-cell" style="width: 20%"></div>
                    <div class="invoice-cell">No Related Transactions Found</div>
                </div>
            </template>
        </div>

        <div class="select-box mt-10 mb-10 p-1-rem">
            <font-awesome-icon icon="plus" size="2x" transform="down-2 shrink-4"/>
            <span class="ml-10" style="font-size: 20px;">Add a Transaction</span>
        </div>

        <div class="invoice-items">
            <div class="invoice-head">
                <div class="invoice-summary-cell" style="width: 90%">Amount Due (INR)</div>
                <div class="invoice-cell" style="width: 10%">12800</div>
            </div>
        </div>

        <button class="invoice-button mt-50">
            <font-awesome-icon icon="print" size="2x" transform="down-4 shrink-6"/>
            <label>Download as PDF</label>
        </button>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Modal from '@/components/common/Modal.vue'
import { mapState } from 'vuex'

export default {
    components: {
        'date-picker': Datepicker,
        'modal': Modal
    },
    data: function () {
        return {
            invoiceNo: 1,
            invoiceDate: new Date(),
            dueDate: new Date(),
            invoiceItems: [
                {
                    id: 0,
                    service: 'Complete Wellness Plan D',
                    description: '24 sessions/month',
                    rate: 7800,
                    quantity: 1,
                    amount: 7800
                },
                {
                    id: 1,
                    service: 'Get-Fit Plan B',
                    description: '16 sessions/month',
                    rate: 5400,
                    quantity: 1,
                    amount: 5400
                }
            ],
            transactionItems: []
        }
    },
    created: function () {
        this.$store.state.modalBox
    },
    computed: {
        ...mapState({
            modalBox: state => state.modalBox
        })
    },
    methods: {
        selectClientBox: function () {
            this.$router.push({ name: 'ModalBox' });
        }
    }
}
</script>

<style scoped>
.invoice-container {
    padding: 50px;
    font-size: 14px;
    line-height: 18px;
    border: 1px solid #cdd4d9;
    border-radius: 10px;
    box-shadow: 2px 2px 0 rgba(6,41,66,.1);
}

img {
    height: 120px;
}

.vertical-line {
  border-left: thick solid #cdd4d9;
}

.company-name {
    font-size: 20px;
    line-height: 35px;
    font-weight: bold;
}

.table-row {
    display: table-row;
    width: auto;
    padding: 10px 15px;
}

.table-cell {
    display: table-cell;
    width: 100px
}

.field-pad {
    padding: 20px 40px 0px 0px;
}

.invoice-info {
    background-color: #cdd4d9;
    width: 350px;
    float: right;
}

.invoice-no {
    padding: 10px 20px;
    background-color: #008CBA;
    font-size: 20px;
    font-weight: bold;
}

.invoice-items {
    display: table;
    width: 100%;
    border-collapse: collapse;
}

.invoice-head {
    display: table-row;
    font-size: 14px;
    background: #f5f5f5;
    font-weight: bold;
    border-top: 1px solid #DDD;
    border-bottom: 1px solid #DDD;
}

.invoice-row {
    display: table-row;
    border-bottom: 1px solid #DDD;
}

.invoice-cell {
    display: table-cell;
    padding: 8px 10px;
}

.invoice-summary-cell {
    display: table-cell;
    padding: 8px 10px;
    text-align: right;
    border-right: 1px solid #DDD;
}

.select-box {
    clear: both;
    cursor: pointer;
    display: block;
    color: #888;
    background: rgba(0, 0, 0, 0.015);
    border: 2px dashed rgba(0, 0, 0, 0.05);
    text-align: center;
}

.select-box:hover {
    background-color: #E0FDFD;
}

.pay-to {
    clear: both;
    cursor: pointer;
    display: block;
    color: #888;
    background: rgba(0, 0, 0, 0.015);
    border: 2px dashed rgba(0, 0, 0, 0.05);
    text-align: left;
    width: 350px;
    line-height: 20px;
}

input[type=text] {
    height: 30px;
    box-sizing: border-box;  
    width: 100%
}

select {
    width: 100%
}

.txt-right {
    text-align: right;
}

.invoice-button {
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    line-height: 2.25rem;
    letter-spacing: .0892857143em;
    color: #FFF;
    background-color: #008CBA;
}
</style>