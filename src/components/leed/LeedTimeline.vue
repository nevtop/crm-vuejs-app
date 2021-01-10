<template>
    <div id="leed-timeline" class="module-wrapper timeline mb-20" style="position: relative;">
        <div v-for="(timeline, index) in timelines" :key="index" class="card mb-20 ml-20">
            <div class="card-heading">
                <label>{{ timeline.stage }}</label>
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
                <span v-if="isStageScheduled(timeline)">Scheduled on<label class="pill-button">{{ getScheduleDate(timeline.scheduleDate) }}</label></span>
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
                            <option v-for="(st, index) in stageSt[`${timeline.stage}`]" 
                                :key="index" :value="st.value" 
                                :selected="isSelected(st.value, timeline.status)"
                            >{{
                                st.key
                            }}
                            </option>
                        </select>
                    </span>
                    <span v-if="isStageScheduled(timeline)" style="display:flex">
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
import * as Util from '@/commonjs/util'
import { StageStatus } from '@/commonjs/constants'

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
            assignees: [],
            stageSt: null,
            timelines: []
        }
    },
    created: function () {
        if (this.leedInfo && this.leedInfo.leedStatuses) {
            this.timelines = this.leedInfo.leedStatuses
        }
        this.stageSt = StageStatus
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
                        this.nextStageName = 'CONSULTATION'
                        return 'Book Consulation'
                    case 'CONSULTATION':
                        this.nextStageName = 'TRIAL'
                        return 'Book Trial'
                    case 'TRIAL':
                        this.nextStageName = 'CONVERSION'
                        return 'Contact Leed'
                    case 'CONVERSION':
                        return 'Close Sale'
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
        getScheduleDate: function (epochTime) {
            if (epochTime == null) {
                return '';
            }

            const options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric',
                hour12: false,
            }
            return new Intl.DateTimeFormat('en-GB', options).format(new Date(epochTime))
        },
        addStage: function () {
            if (this.timelines[this.timelines.length-1].stage === 'CONVERSION') {
                const clientInfo = {
                    leedId: this.leedInfo.id,
                    clientName: this.leedInfo.leedName,
                    address: this.leedInfo.address
                }
                this.$router.push({ name: 'AddClient', params: { leedData: clientInfo } });
                return
            }

            this.setStates(true)
            const currDate = new Date()
            const time = Util.getTimeValue(currDate.getTime())
            const timeline = { 
                stage: this.nextStageName, 
                assignedTo: '0', 
                status: '', 
                scheduleDate: currDate,
                timeValue: time
            }
            this.timelines.push(timeline)
        },
        saveStage: function () {
            this.setStates(false)
            const temp = this.timelines[this.timelines.length-1]
            const newStage = {
                id: temp.id,
                leedId: this.leedInfo.id,
	            stage: temp.stage,
	            status: temp.status,
	            profileId: parseInt(temp.assignedTo),
	            scheduleDate: Util.calculateScheduleDate(temp.scheduleDate, temp.timeValue)
            }
            this.$store.dispatch('SAVE_STAGE', newStage)
        },
        removeStage: function () {
            this.setStates(false)
            this.timelines.pop()
        },
        getSelectedElement: function (val, models, defVal) {
            if (models != null && models.length > 0) {
                const model = models.filter(ele => ele.value == val)
                return model && model.length > 0 ? model[0].key : defVal
            }
            return defVal
        },
        setStates: function (bool) {
            this.stageEdit = bool
            this.tempStage = bool
        }
    },
    watch: {
        leedInfo: function(newValue) {
            this.timelines = newValue.leedStatuses
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