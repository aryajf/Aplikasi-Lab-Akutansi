import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import appConfig from "./config/app"

// Primevue
import PrimeVue from 'primevue/config'
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@popperjs/core"

// Axios
import axios from 'axios'
axios.defaults.baseURL = appConfig.apiURL

// Notyf
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
window.notyf = new Notyf({duration: 4000})

import Pagination from 'v-pagination-3';
import VueCountdown from '@chenfengyuan/vue-countdown'

require('@/store/subscriber')

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    createApp(App).use(store).use(router).use(PrimeVue).component('pagination', Pagination).component(VueCountdown.name, VueCountdown).mount('#app')
})
