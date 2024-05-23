import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import Toast from 'vue-toastification'

import 'vue-toastification/dist/index.css'
// import "./assets/style.css";
import './assets/css/satoshi.css'
import './assets/css/style.css'

import './axios'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(Toast)
app.use(router)
app.use(pinia)
app.mount('#app')
