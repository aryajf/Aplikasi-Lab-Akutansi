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
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@popperjs/core"

// Vue Cropper
import 'cropperjs/dist/cropper.css'

// Vue Counter
import VueJsCounter from 'vue-js-counter'

// Vue Carousel
import VueCarousel from '@chenfengyuan/vue-carousel';

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
    createApp(App).use(store).use(router).use(PrimeVue).component('Dialog',Dialog).component('Button',Button).component(VueCarousel.name, VueCarousel).component('pagination', Pagination).component('VueJsCounter',VueJsCounter).component(VueCountdown.name, VueCountdown).mount('#app')
})
