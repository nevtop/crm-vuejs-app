<template>
    <div class="module-wrapper">
        <!-- SCRAP VIEW -->
        <template v-if="view === 'SCRAP'">
            <leed-scrap :stage="selectedStage" @scrap-leed="scrapLeed" @close-scrap="view = 'TIMELINE'"/>
        </template>
        <!-- TIMELINE VIEW -->
        <template v-if="view === 'TIMELINE'">
            <!-- TABS -->
            <ul>
                <li v-for="(stage, index) in stages" :key="index" :class="applyCssStage(index)" @click="selectStage(index)">
                    <font-awesome-icon  :style="applyCssStageIcon(index)" :icon="deriveStageIcon(index)" size="1x"/>
                    <label style="padding:2px">{{ stage.name }}</label>
                </li>
            </ul>
            <!-- EDIT BUTTON -->
            <template v-if="timelines[selectedStage]">
                <div v-if="timelines[selectedStage].mode === 'VIEW'" style="float:right">
                    <button v-if="isEditVisible" type="button" @click="executeAction('EDIT')">
                        <font-awesome-icon icon="edit" size="1x"/>
                    </button>
                </div>
            </template>
            <!-- QUALIFICATION TAB | CONSULTATION TAB | TRIAL TAB | CONVERSION TAB -->
            <div v-for="i in 4" :key="i">
                <template v-if="selectedStage === i-1">
                    <template v-if="timelines[i-1]">
                        <div>Created on: {{ timelines[i-1].createDate }}</div>
                        <form-module v-bind:mode="timelines[i-1].mode" v-model="timelines[i-1]">
                            <form-field input="select" label="Assignee" map="assignee" :models="assigneeList"></form-field>
                            <form-field input="select" label="Flag" map="flag" :models="flagOptions[i-1]"></form-field>
                            <template v-if="timelines[i-1].flag === 'SCHEDULED'">
                                <span slot="form-field-label">Schedule Date: </span>
                                <span slot="form-field-value" style="display:flex">
                                    <date-picker v-model="timelines[i-1].scheduleDate"/>
                                    <time-picker v-model="timelines[i-1].timeValue"></time-picker> 
                                </span>
                                <span slot="form-field-view" class="pill-button">{{ getScheduleDate(timelines[i-1].scheduleDate) }}</span>
                            </template>
                        </form-module>
                        <form-module v-bind:mode="timelines[i-1].mode" v-model="timelines[i-1]">
                            <form-field input="textarea" label="Remark" map="remark"></form-field>
                        </form-module>
                    </template>
                    <template v-else>
                        <alert type="info" :message="info[i-1]" @close-alert="{}"></alert>
                    </template>
                </template>
            </div>
            <!-- ACTION BUTTONS -->
            <template v-if="timelines[selectedStage]">
                <div v-if="timelines[selectedStage].mode === 'VIEW'" class="mt-25 mb-25">
                    <button v-if="isScrapVisible" type="button" class="btn" @click="executeAction('SCRAP')">Scrap</button>
                    <button v-if="isDoneVisible" type="button" class="btn" @click="executeAction('DONE')">{{ doneButtonByStage }}</button>
                </div>
                <div v-else class="mt-25 mb-25">
                    <button type="button" class="btn" @click="executeAction('SAVE')">Save</button>
                    <button v-if="timelines[selectedStage].id" type="button" class="btn" @click="executeAction('CANCEL')">Cancel</button>
                    <button v-else type="button" class="btn" @click="executeAction('UNDO')">Undo</button>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
import LeedScrap from '@/components/leed/LeedScrap'
import FormModule from '@/components/common/FormModule'
import FormField from '@/components/common/FormField'
import Datepicker from 'vuejs-datepicker'
import Timepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import Alert from '@/components/common/Alert'
import { StageFlagOptions } from '@/commonjs/constants'
import * as Util from '@/commonjs/util'

export default {
    components: {
        'leed-scrap': LeedScrap,
        'form-module': FormModule,
        'form-field': FormField,
        'date-picker': Datepicker,
        'time-picker': Timepicker,
        'alert': Alert
    },
    props: {
        leedInfo: Object
    },
    data: function () {
        return {
            stages: [
                { name: 'Qualification' },
                { name: 'Consultation' },
                { name: 'Trial' },
                { name: 'Conversion' },
            ],
            view: 'TIMELINE',
            stageDoneStatusMap: new Map(),
            createDate: '23 Feb 2021',
            selectedStage: 0,
            assigneeList: [
                { key: 'Piyush Mehta', value: 1 },
                { key: 'Vishal Kumar', value: 2 },
                { key: 'Navneet Singh', value: 3 },
                { key: 'Aarti Kumari', value: 4 },
                { key: 'Akash Jha', value: 5 },
            ],
            statusList: [],
            timelines: [],
            info: [
                'Qualification record is not generated yet',
                'Consultation record is not generated yet',
                'Trial record is not generated yet',
                'Conversion record is not generated yet'
            ]
        }
    },
    created: function () {
        this.stageDoneStatusMap.set(0, 'Qualify')
        this.stageDoneStatusMap.set(1, 'Done')
        this.stageDoneStatusMap.set(2, 'Done')
        this.stageDoneStatusMap.set(3, 'Close')
        this.flagOptions = StageFlagOptions

        if (this.leedInfo && this.leedInfo.leedTimelines) {
            this.timelines = [...this.leedInfo.leedTimelines]
        }

        this.selectedStage = this.timelines.length - 1
    },
    computed: {
        isEditVisible: function () {
            return this.isLastStageSelected()
        },
        isDoneVisible: function () {
            return this.isLastStageSelected()
        },
        isScrapVisible: function () {
            return this.isLastStageSelected()
        },
        doneButtonByStage: function () {
            if (this.isLastStageSelected()) {
                return this.stageDoneStatusMap.get(this.selectedStage)
            }
        }
    },
    methods: {
        isLastStageSelected: function () {
            const len = this.timelines.length
            const id = this.timelines[len-1].id
            const status = this.timelines[len-1].status
            return this.selectedStage === len-1 && id && status === 'ACTIVE'
        },
        selectStage: function (stageNo) {
            this.selectedStage = stageNo
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
        applyCssStage: function (index) {
            const status = 'DONE'
            if (this.timelines[index]) {
                if (this.selectedStage === index && this.timelines[index].status === status) {
                    return 'active-done'
                } else if (this.selectedStage === index && this.timelines[index].status === 'SCRAP') {
                    return 'active-scrap'
                } else if (this.selectedStage === index) {
                    return 'active'
                } else if (this.timelines[index].status === status) {
                    return 'done'
                } else if (this.timelines[index].status === 'SCRAP') {
                    return 'scrap'
                } else {
                    return 'inprogress'
                }
            }

            if (this.selectedStage === index) {
                return 'inactive'
            }
            return ''
        },
        deriveStageIcon: function (index) {
            const status = 'DONE'
            if (this.timelines[index]) {
                if (this.timelines[index].status === status) {
                    return ['fas', 'check-circle']
                } else if (this.timelines[index].status === 'SCRAP') {
                    return ['fas', 'times-circle']
                } else {
                    return ['far', 'dot-circle']
                }
            }
            return ['far', 'circle']
        },
        applyCssStageIcon: function (index) {
            const status = 'DONE'
            if (this.selectedStage === index) {
                return { color: '#fff' }
            }
            
            if (this.timelines[index]) {
                if (this.timelines[index].status === status) {
                    return { color: '#049a00' }
                } else if (this.timelines[index].status === 'SCRAP') {
                    return { color: '#f44336' }
                } else {
                    return { color: '#008CBA' }
                }
            }
            return { color: '#949494' }
        },
        executeAction: function (type) {
            const currIndex = this.timelines.length - 1
            switch (type) {
                case 'EDIT':
                    this.timelines[currIndex].mode = 'EDIT'
                    break
                case 'SCRAP':
                    this.view = 'SCRAP'
                    break
                case 'DONE':
                    if (this.timelines[currIndex].stage === 'CONVERSION') {
                        const stage = this.timelines[currIndex]
                        const leedData = {
                            leedId: this.leedInfo.id,
                            clientName: this.leedInfo.leedName,
                            address: this.leedInfo.address,
                            stageData: {
                                id: stage.id,
                                leedId: this.leedInfo.id,
                                stage: stage.stage,
                                status: stage.status,
                                flag: stage.flag,
                                assigneeProfileId: parseInt(stage.assignee),
                                remark: stage.remark,
                                leedConverted: true
                            }
                        }
                        this.$router.push({ name: 'AddClient', params: { leedData: leedData } });
                        return
                    }

                    this.timelines[currIndex].status = 'DONE'
                    const tempStage = { 
                        stage: currIndex + 1,
                        assignee: 2, 
                        status: 'ACTIVE',
                        flag: 'RECORD', 
                        scheduleDate: new Date(), 
                        timeValue: '00:00',
                        remark: '',
                        mode: 'ADD'
                    }
                    this.timelines.push(tempStage)
                    this.selectedStage = currIndex + 1
                    break
                case 'SAVE':
                    const stage = this.timelines[currIndex]
                    const stageData = {
                        id: stage.id,
                        leedId: this.leedInfo.id,
                        stage: stage.stage,
                        status: stage.status,
                        flag: stage.flag,
                        assigneeProfileId: parseInt(stage.assignee),
                        scheduleDate: Util.calculateScheduleDate(stage.scheduleDate, stage.timeValue),
                        remark: stage.remark,
                        leedConverted: false
                    }
                    this.$store.dispatch('SAVE_STAGE', stageData)
                    stage.mode = 'VIEW'
                    break
                case 'CANCEL':
                    this.timelines[currIndex].mode = 'VIEW'
                    break
                case 'UNDO':
                    this.selectedStage = currIndex - 1
                    this.timelines[this.selectedStage].status = 'ACTIVE'
                    this.timelines.pop()
                    break
                default:
            }
        },
        scrapLeed: function (scrapValue) {
            const scrapModel = {
                leedId: this.leedInfo.id,
                id: this.timelines[this.selectedStage].id,
                scrap: scrapValue,
            }
            this.$store.dispatch('SCRAP_LEED', scrapModel)
            this.view = 'TIMELINE'
        }
    },
    watch: {
        leedInfo: function(newValue) {
            if (newValue && newValue.leedTimelines) {
                this.timelines = [...newValue.leedTimelines]
            }
            this.selectedStage = this.timelines.length - 1
        }
    }
}
</script>

<style scoped>
ul {
    display: flex;
}

li {
    font-size: 20px;
    border: 2px solid #949494;
    padding: 5px;
    margin: 5px;
    list-style-type: none;
}

li::after {
    content: "\27A4";
}

.done {
    border: 2px solid #049a00;
}

.scrap {
    border: 2px solid #f44336;
}

.inprogress {
    border: 2px solid #008CBA;
}

.active {
    border: 2px solid #008CBA;
    background-color: #008CBA;
    color: #fff;
}

.active-done {
    border: 2px solid #049a00;
    background-color: #049a00;
    color: #fff;
}

.inactive {
    border: 2px solid #949494;
    background-color: #949494;
    color: #fff;
}

.active-scrap {
    border: 2px solid #f44336;
    background-color: #f44336;
    color: #fff;
}

.pill-button {
  background-color: #ddd;
  border: none;
  color: black;
  padding: 0px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0px 5px;
  font-size: 15px;
}
</style>