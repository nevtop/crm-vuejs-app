<template>
    <div id="leed-timeline" class="module-wrapper timeline" style="position: relative;">
        <div v-for="(timeline, index) in timelines" :key="index" class="card mb-20 ml-20">
            <div class="card-heading">
                <label>{{ timeline.title }}</label>
                <label style="font-size:14px;font-style:italic;">[{{ timeline.createDate }}]</label>
                <vbutton
                    v-if="index === timelines.length-1 && !tempStage"
                    style="float:right" 
                    :status="{ name: !stageEdit ? 'Edit' : 'Cancel', type: 'info'}" 
                    :nohover="true"
                    @vclick="stageEdit = !stageEdit"
                />
            </div>
            <!-- VIEW -->
            <div v-if="index !== timelines.length-1 || !stageEdit" class="card-content">
                <span>Assigned To<label class="pill-button">{{ getSelectedElement(timeline.assignedTo, assignees, 'Unassigned') }}</label></span>
                <span>Status<label class="pill-button">{{ timeline.status ? timeline.status : 'Not known' }}</label></span>
                <span v-if="isStageScheduled(timeline)">Scheduled on<label class="pill-button">{{ getScheduleDate(timeline) }}</label></span>
            </div>
            <!-- ADD & EDIT -->
            <div v-if="index === timelines.length-1 && stageEdit">
                <div  class="card-content">
                    <span>
                        Assigned To
                        <select v-model="timeline.assignedTo">
                            <option value="0">Unassigned</option>
                            <option v-for="(assignee, index) in assignees" 
                                :key="index" 
                                :value="assignee.value"
                                :selected="isSelected(assignee.value, timeline.assignedTo)"
                            >{{
                                assignee.key
                            }}</option>
                        </select>
                    </span>
                    <span>
                        Status
                        <select v-model="timeline.status">
                            <option value="">Please select</option>
                            <option v-for="(st, index) in status" 
                                :key="index" :value="st.value" 
                                :selected="isSelected(st.value, timeline.status)"
                            >{{
                                st.key
                            }}
                            </option>
                        </select>
                    </span>
                    <span style="display:flex">
                        <date-picker v-model="timeline.scheduleDate"/>
                        <time-picker v-model="timeline.timeValue"></time-picker>
                    </span>
                </div>
                <div style="padding:10px;border-top: 1px solid #b3b3b2;"> 
                    <button @click="saveStage">Save</button>
                    <button v-if="tempStage" @click="removeStage">Remove</button>
                </div>
            </div>
        </div>
        <div v-if="proceedToNextStage && !stageEdit" class="ml-20">
            <button @click="addStage">{{ getStageName }}</button>
        </div>
    </div>
</template>

<script>
import VButton from '@/components/elements/CustomButton'
import Datepicker from 'vuejs-datepicker';
import Timepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
    components: {
        'vbutton': VButton,
        'date-picker': Datepicker,
        'time-picker': Timepicker
    },
    props: {
        leedInfo: Object
    },
    data: function () {
        return {
            stageEdit: false,
            tempStage: false,
            nextStageName: '',
            assignees: [
                { key: 'Aarti', value: '1'},
                { key: 'Piyush', value: '2' },
                { key: 'Vishal', value: '3' },
                { key: 'Ankit', value: '4' },
            ],
            status: [
                { key: 'CANCELLED', value: 'CANCELLED' },
                { key: 'DISQUALIFIED', value: 'DISQUALIFIED' },
                { key: 'DONE', value: 'DONE' },
                { key: 'HOLD', value: 'HOLD' },
                { key: 'INPROGRESS', value: 'INPROGRESS' },
                { key: 'OVERDUE', value: 'OVERDUE' },
                { key: 'PENDING', value: 'PENDING' },
                { key: 'QUALIFIED', value: 'QUALIFIED' },
                { key: 'RECORD', value: 'RECORD' },
                { key: 'REJECT', value: 'REJECT' },
                { key: 'SCHEDULED', value: 'SCHEDULED' }
            ],
            timelines: [
                { id: 1, title: 'Generated', stage: 'GENERATION', createDate: '23-DEC-2020', assignedTo: 3, status: 'QUALIFIED' },
                // { id: 2, title: 'Consultation', createDate: '25-DEC-2020', assignedTo: 'Piyush', status: 'COMPLETED', scheduleDate: 1606156200000 },
                // { id: 3, title: 'Trail', createDate: '27-DEC-2020', assignedTo: 'Vishal', status: 'COMPLETED' },
                // { id: 4, title: 'Conversion', createDate: '28-DEC-2020', assignedTo: 'Aarti', status: 'INPROGRESS' },
            ]
        }
    },
    computed: {
        proceedToNextStage: function () {
            return (this.leedInfo && (this.leedInfo.status === 'QUALIFIED' || this.leedInfo.status === 'DONE'))
                ? true
                : false
        },
        getStageName: function () {
            if (this.leedInfo) {
                switch (this.leedInfo.stage) {
                    case 'GENERATION':
                        this.nextStageName = 'Consultation'
                        return 'Book Consulation'
                    case 'CONSULTATION':
                        this.nextStageName = 'Trial'
                        return 'Book Trial'
                    case 'TRIAL':
                        this.nextStageName = 'Conversion'
                        return 'Close Sale'
                    case 'CONVERSION':
                        return 'Create Profile'
                }
            }
        }
    },
    methods: {
        isSelected: function (key, val) {
            return key === val
        },
        isStageScheduled: function (timeline) {
            return (timeline.status === 'SCHEDULED' && (timeline.stage === 'CONSULTATION' || timeline.stage === 'TRIAL'))
                ? true
                : false
        },
        getScheduleDate: function (timeline) {
            const arr = timeline.timeValue.split(":");
            const millis = (parseInt(arr[0])*60 + parseInt(arr[1]))*60*1000
            const totalMillis = new Date(timeline.scheduleDate).getTime() + millis;
            const options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric',
                hour12: false,
            }
            return new Intl.DateTimeFormat('en-GB', options).format(new Date(totalMillis))
        },
        addStage: function () {
            this.assignValues(true)
            const currDate = new Date()
            const time = currDate.getHours() + ":" + currDate.getMinutes()
            currDate.setHours(0);
            currDate.setMinutes(0);
            currDate.setSeconds(0);
            currDate.setMilliseconds(0);
            const timeline = { 
                title: this.nextStageName, 
                assignedTo: '0', 
                stage: 'CONSULTATION',
                status: '', 
                scheduleDate: currDate,
                timeValue: time
            }
            this.timelines.push(timeline)
        },
        saveStage: function () {
            this.assignValues(false)
            this.leedInfo.status = this.timelines[this.timelines.length-1].status
            this.leedInfo.stage = this.timelines[this.timelines.length-1].stage
        },
        removeStage: function () {
            this.assignValues(false)
            this.timelines.pop()
        },
        getSelectedElement: function (val, models, defVal) {
            if (models != null && models.length > 0) {
                const model = models.filter(ele => ele.value == val)
                return model && model.length > 0 ? model[0].key : defVal
            }
            return defVal
        },
        assignValues: function (bool) {
            this.stageEdit = bool
            this.tempStage = bool
        }
    }
}
</script>

<style scoped>
.timeline::before {
    content: '';
    position: absolute;
    width: 3px;
    background-color: #008CBA;
    top: 0;
    bottom: 0;
}

.card {
    position: relative;
    display: block;
    border: 1px solid #b3b3b2;
}

.card::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    left: -29px;
    background-color: white;
    border: 4px solid #008CBA;
    top: 8px;
    border-radius: 50%;
    z-index: 1;
}

.card .card-heading {
    font-size: 20px;
    color: white;
    background-color: #008CBA;
    padding: 10px;
}

.card .card-content {
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
}

.pill-button {
  background-color: #ddd;
  border: none;
  color: black;
  padding: 8px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0px 5px;
  font-size: 12px;
}
</style>