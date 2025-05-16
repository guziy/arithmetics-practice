


import {createApp} from 'vue'


import App from './App.vue'


//import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret)
library.add(faSpinner)
library.add(faCheck)
library.add(faTimes)
library.add(faStopwatch)
library.add(faGlobe)


import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { createBootstrap } from 'bootstrap-vue-next'
library.add(faGithub)


//import Vuelidate from 'vuelidate'

//import {getI18n} from '@/plugins/i18n'




/** 
var moment = require("moment");
require("moment/locale/fr");
require("moment/locale/uk");

*/

//import {format} from 'date-fns'
//import {fr, uk} from 'date-fns/locale'

//import {formatDistance} from 'date-fns'


// Vue.config.productionTip = false

const app = createApp(App)
app.use(createBootstrap())

/**
app.use(getI18n())
app.use(Vuelidate)
app.use(BootstrapVue);
app.component('font-awesome-icon', FontAwesomeIcon)
*/

//app.use(formatDistance)
app.mount('#app')


/**
new Vue({
  i18n,
  render: h => h(App),
  validations:{}
}).$mount('#app')
*/

