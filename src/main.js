import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret)
library.add(faSpinner)
library.add(faCheck)
library.add(faTimes)
library.add(faStopwatch)

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

import {i18n} from '@/plugins/i18n'

Vue.component('font-awesome-icon', FontAwesomeIcon)

import VuePageTitle from 'vue-page-title'

Vue.use(VuePageTitle, {
  prefix: '',
  // suffix: '- My App '
})


Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App),
  validations:{}
}).$mount('#app')
