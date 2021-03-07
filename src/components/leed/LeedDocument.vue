<template>
    <div id="lead-document" class="module-wrapper">
        <template v-if="modalBox">
            <modal title="Document Upload" @close="$store.dispatch('OPEN_MODAL_BOX', false)">
                <div slot="content">
                    <select>
                        <option value="-1">Please select category</option>
                        <option value="0">Workout Plan</option>
                        <option value="1">Diet Plan</option>
                        <option value="2">Health History</option>
                        <option value="3">Assessment</option>
                    </select>
                    <input type="file">
                    <button style="float:right">UPLOAD</button>
                </div>
            </modal>
        </template>
        <div v-for="item in items" :key="item.id" class="doc-item mb-10">
            <span class="doc-icon mr-10">
                <font-awesome-icon icon="file-pdf" size="3x"/>
            </span>
            <span class="flex-column" style="flex-basis: 450px; line-height: 24px">
                <label for="name">{{ item.fileName }}</label>
                <label for="size">{{ item.fileSize }}</label>
            </span>
            <span style="flex-basis: 210px; line-height: 45px">
                <label for="date"><i>{{ item.createDate }}</i></label>
            </span>
            <span style="flex-basis: 300px; line-height: 45px">
                <label class="pill-button" for="type">{{ item.category }}</label>
            </span>
            <span class="action mr-5">
                <font-awesome-icon icon="download" size="2x" transform="shrink-4 down-2"/>
            </span>
            <span class="action">
                <font-awesome-icon icon="trash-alt" size="2x" transform="shrink-4 down-2"/>
            </span>
        </div>
    </div>
</template>

<script>
import Modal from '@/components/common/Modal.vue'
import { mapState } from 'vuex'

export default {
    components: {
        'modal': Modal
    },
    data: function () {
        return {
            items: [
                {   
                    id: 1,
                    fileName: 'ABCfsdlfas.pdf',
                    fileSize: '4 MB',
                    createDate: '23-FEB-2021',
                    category: 'HEALTH HISTORY'
                },
                {   
                    id: 3,
                    fileName: 'ABCfsdlfasadsaada.pdf',
                    fileSize: '11 MB',
                    createDate: '23-FEB-2021',
                    category: 'WORKOUT PLAN'
                },
                {   
                    id: 13,
                    fileName: 'ABCfsdasfadasdassdfsfsdasdasdasdsalfas.pdf',
                    fileSize: '40 MB',
                    createDate: '23-FEB-2021',
                    category: 'DIET PLAN'
                }
            ]
        }
    },
    created: function () {
        this.$store.state.modalBox
    },
    computed: {
        ...mapState({
            modalBox: state => state.modalBox
        })
    }
}
</script>

<style scoped>
.doc-item {
    display: flex;
    border: 2px solid #c1bdbd;
    padding: 5px 0px 5px 5px;
}

.doc-icon {
    border-right: 2px solid #c1bdbd; 
    padding-right: 5px;
}

.pill-button {
    background-color: #ddd;
    border: none;
    color: black;
    padding: 0px 14px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    }

.action {
    border: 2px solid #c1bdbd;
}
.action:hover {
    background-color: #008cba;
    border: 2px solid #008cba;
    color: white;
}
</style>