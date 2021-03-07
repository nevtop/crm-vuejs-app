import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

/** Solid SVG icons */
import {
    faAngleDown,
    faCaretRight,
    faCheckCircle,
    faCubes,
    faDownload,
    faEdit,
    faExclamationCircle,
    faFilePdf,
    faFilter,
    faInfoCircle,
    faSitemap,
    faTimesCircle,
    faTrashAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faAngleDown,
    faCaretRight,
    faCheckCircle,
    faCubes,
    faDownload,
    faEdit,
    faExclamationCircle,
    faFilePdf,
    faFilter,
    faInfoCircle,
    faSitemap,
    faTimesCircle,
    faTrashAlt,
    faUser,
)

/** Regular SVG icons */
import {
    faCircle,
    faDotCircle,
} from '@fortawesome/free-regular-svg-icons'

library.add(
    faCircle,
    faDotCircle,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)