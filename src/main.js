import { createApp } from 'vue'
import { router } from './router/index.js'
import App from './App.vue'
import store from './vuex/store';
// import Vue from 'vue'
import './index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')

// export const bus = createApp(App)d