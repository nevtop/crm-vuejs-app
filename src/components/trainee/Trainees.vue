<template>
    <div>
        <div v-if="traineePage || traineeTab" class="wrapper">
            <div v-if="traineePage" class="heading">
                <label class="label-heading">Trainees</label>
                <router-link :to="{ name: 'AddTrainee'}" class="link">New Trainee</router-link>
            </div>
            <search v-if="traineePage" width='250px' placeholder="Search for trainee.."></search>
            <table-view v-bind:list="traineeList" action="MemberView">
                <table-column label="First Name" map="firstName"></table-column>
                <table-column label="Last Name" map="lastName"></table-column>
                <table-column label="Gender" map="gender"></table-column>
                <table-column label="Mobile" map="primaryPhone"></table-column>
                <table-column label="Email" map="primaryEmail"></table-column>
                <table-column label="City" map="city"></table-column>
                <table-column label="State" map="state"></table-column>
            </table-view>
        </div>
        <router-view name="trainees"></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '@/components/common/Search'
import TableView from '@/components/table/TableView.vue'
import TableColumn from '@/components/table/TableColumn.vue'

export default {
    components: {
        'search': Search,
        'table-view': TableView,
        'table-column': TableColumn
    },
    data: function () {
        return {
            traineePage: true,
            traineeTab: false
        }
    },
    created: function () {
        switch (this.$route.name) {
            case 'Trainees':
                this.$store.dispatch('FETCH_ALL_TRAINEES')
                this.setState(true, false)
                break
            case 'SessionView':
                this.setState(false, true)
                break
            default:
                this.setState(false, false)
        }

        this.$store.dispatch('FETCH_SESSION_SELECT_LIST')
    },
    computed: {
        ...mapGetters({
            traineeList: 'GET_TRAINEE_LIST'
        })
    },
    methods: {
        setState: function (bool1, bool2) {
            this.traineePage = bool1
            this.traineeTab = bool2
        }
    },
    watch: {
        $route (to, next) {
            if (to.name === 'Trainees') {
                this.traineePage = true
                if (this.$store.getters.IS_DATA_MODIFIED) {
                    this.$store.dispatch('FETCH_ALL_TRAINEES')
                    this.$store.commit('DATA_MODIFIED', false)
                }
            } else {
                this.traineePage = false
            }
        }
    }
}
</script>

<style scoped>
.wrapper {
    max-width: 1100px;
    margin: auto;
}

.heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
}

.label-heading {
    height: 45px;
    font-size: 25px;
    font-weight: bold;
    line-height: 40px;
}

.link {
    color: black;
    text-align: center;
    height: 18px;
    padding: 12px 10px;
    text-decoration: none;
    font-size: 15px;
    border: 2px solid #008cba;
    transition-duration: 0.4s;
    cursor: pointer;
}

.link:hover {
    background-color: #008cba;
    color: white;
}
</style>