


import {createApp} from 'vue'


import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret)
library.add(faSpinner)
library.add(faCheck)
library.add(faTimes)
library.add(faStopwatch)
library.add(faGlobe)

import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faGithub)



import {getI18n} from './plugins/i18n'

const app = createApp(App)


app.use(getI18n())
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')


