import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

// Alert.vue
import { faTimesCircle, faCheckCircle, faInfoCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faTimesCircle, faCheckCircle, faInfoCircle, faExclamationCircle)

//search filter
import { faFilter, faAngleDown } from '@fortawesome/free-solid-svg-icons'
library.add(faFilter, faAngleDown)

//LeedDocument.vue
import { faFilePdf, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faFilePdf, faDownload, faTrashAlt)

// ClientView.vue
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
library.add(faCaretRight)

// Setting.vue - user
import { faUser, faSitemap, faCubes } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faSitemap, faCubes)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)