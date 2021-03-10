<template>
    <div class="module-wrapper">
        <!-- SCRAP VIEW -->
        <template v-if="view === 'SCRAP'">
            <leed-scrap :stage="selectedStage" @submit-scrap="submitScrap" @close-scrap="view = 'TIMELINE'"/>
        </template>
        <!-- TIMELINE VIEW -->
        <template v-if="view === 'TIMELINE'">
            <!-- TABS -->
            <ul>
                <li v-for="(stage, index) in stages" :key="index" 
                        :class="applyCssStage(index)" 
                        @click="selectedStage = index">
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
            
            <!-- QUALIFICATION TAB-->
            <div v-if="selectedStage == 0" key="stage-0">
                <template v-if="timelines[0]">
                    <div>Created on: {{ createDate }}</div>
                    <form-module v-bind:mode="timelines[0].mode" v-model="timelines[0]">
                        <form-field input="select" label="Assignee" map="assignee" :models="assigneeList"></form-field>
                        <form-field input="select" label="Flag" map="flag" :models="flagOptions[0]"></form-field>
                        <form-field input="textarea" label="Remark" map="remark"></form-field>
                    </form-module>
                </template>
                <template v-else>
                    <alert type="info" message="Qualification record is not generated yet" @close-alert="{}"></alert>
                </template>
            </div>
            <!-- CONSULTATION TAB-->
            <div v-else-if="selectedStage == 1" key="stage-1">
                <template v-if="timelines[1]">
                    <div>Created on: {{ createDate }}</div>
                    <form-module v-bind:mode="timelines[1].mode" v-model="timelines[1]">
                        <form-field input="select" label="Assignee" map="assignee" :models="assigneeList"></form-field>
                        <form-field input="select" label="Flag" map="flag" :models="flagOptions[1]"></form-field>
                        <span slot="form-field-label">Schedule Date: </span>
                        <span slot="form-field-value" style="display:flex">
                            <date-picker v-model="timelines[1].scheduleDate"/>
                            <time-picker v-model="timelines[1].timeValue"></time-picker> 
                        </span>
                        <span slot="form-field-view" class="pill-button">{{ getScheduleDate(timelines[1].scheduleDate) }}</span>
                    </form-module>
                    <form-module v-bind:mode="timelines[1].mode" v-model="timelines[1]">
                        <form-field input="textarea" label="Remark" map="remark"></form-field>
                    </form-module>
                </template>
                <template v-else>
                    <alert type="info" message="Consultation record is not generated yet" @close-alert="{}"></alert>
                </template>
            </div>
            <!-- TRIAL TAB-->
            <div v-else-if="selectedStage == 2" key="stage-2">
                <template v-if="timelines[2]">
                    <div>Created on: {{ createDate }}</div>
                    <form-module v-bind:mode="timelines[2].mode" v-model="timelines[2]">
                        <form-field input="select" label="Assignee" map="assignee" :models="assigneeList"></form-field>
                        <form-field input="select" label="Flag" map="flag" :models="flagOptions[2]"></form-field>
                        <span slot="form-field-label">Schedule Date: </span>
                        <span slot="form-field-value" style="display:flex">
                            <date-picker v-model="timelines[2].scheduleDate"/>
                            <time-picker v-model="timelines[2].timeValue"></time-picker> 
                        </span>
                        <span slot="form-field-view" class="pill-button">{{ getScheduleDate(timelines[2].scheduleDate) }}</span>
                    </form-module>
                    <form-module v-bind:mode="timelines[2].mode" v-model="timelines[2]">
                        <form-field input="textarea" label="Remark" map="remark"></form-field>
                    </form-module>
                </template>
                <template v-else>
                    <alert type="info" message="Trial record is not generated yet" @close-alert="{}"></alert>
                </template>
            </div>
            <!-- CONVERSION TAB-->
            <div v-else-if="selectedStage == 3" key="stage-0">
                <template v-if="timelines[3]">
                    <div>Created on: {{ createDate }}</div>
                    <form-module v-bind:mode="timelines[3].mode" v-model="timelines[3]" key="stage-3">
                        <form-field input="select" label="Assignee" map="assignee" :models="assigneeList"></form-field>
                        <form-field input="select" label="Flag" map="flag" :models="flagOptions[3]"></form-field>
                        <form-field input="textarea" label="Remark" map="remark"></form-field>
                    </form-module>
                </template>
                <template v-else>
                    <alert type="info" message="Conversion record is not generated yet" @close-alert="{}"></alert>
                </template>
            </div>
            <!-- ACTION BUTTONS -->
            <template v-if="timelines[selectedStage]">
                <div v-if="timelines[selectedStage].mode === 'VIEW'" class="mt-25 mb-25">
                    <button v-if="isScrapVisible" type="button" class="btn" @click="executeAction('SCRAP')">Scrap</button>
                    <button v-if="isDoneVisible" type="button" class="btn" @click="executeAction('DONE')">Done</button>
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

export default {
    components: {
        'leed-scrap': LeedScrap,
        'form-module': FormModule,
        'form-field': FormField,
        'date-picker': Datepicker,
        'time-picker': Timepicker,
        'alert': Alert
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
            stageStatusMap: new Map(),
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
            timelines: [
                { id: 1, stage: 0, assignee: 2, status: 'ACTIVE', flag: 'RECORD', createDate: '', completeDate: '', scheduleDate: '', timeValue: '', remark: '', mode: 'VIEW' },
            ]
        }
    },
    created: function () {
        const len = this.timelines.length
        this.stageStatusMap.set(0, 'QUALIFIED')
        this.stageStatusMap.set(1, 'DONE')
        this.stageStatusMap.set(2, 'DONE')
        this.stageStatusMap.set(3, 'CLOSE')
        this.flagOptions = StageFlagOptions
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
        }
    },
    methods: {
        isLastStageSelected: function () {
            const len = this.timelines.length
            return this.selectedStage === len-1
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
            const status = this.stageStatusMap.get(index)
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
            const status = this.stageStatusMap.get(index)
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
            const status = this.stageStatusMap.get(index)
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
                    this.timelines[currIndex].status = this.stageStatusMap.get(currIndex)
                    const tempStage = { 
                        stage: currIndex + 1,
                        assignee: 2, 
                        status: 'ACTIVE',
                        flag: 'RECORD', 
                        createDate: '', 
                        completeDate: '', 
                        scheduleDate: new Date(), 
                        timeValue: '00:00',
                        remark: '',
                        mode: 'ADD'
                    }
                    this.timelines.push(tempStage)
                    this.selectedStage = currIndex + 1
                    break
                case 'SAVE':
                    this.timelines[currIndex].id = currIndex + 1
                    this.timelines[currIndex].mode = 'VIEW'
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
        submitScrap: function (scrapValue) {
            this.timelines[this.selectedStage].status = 'SCRAP'
            this.view = 'TIMELINE'
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