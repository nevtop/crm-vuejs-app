import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

// alert
import { faTimesCircle, faCheckCircle, faInfoCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faTimesCircle, faCheckCircle, faInfoCircle, faExclamationCircle)

// client
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
library.add(faCaretRight)

// setting - user
import { faUser, faSitemap } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faSitemap)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)