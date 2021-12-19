import { createApp } from 'vue'
import { router } from './router/index.js'
import App from './App.vue'
import store from './vuex/store';
import VCalendar from 'v-calendar';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/vue-toast-noti-custom.css'
import './index.css'

const app = createApp(App)

app.config.globalProperties.initialDate = 
  new Date('2021-05-19T00:00:00.000Z');
app.use(router)
app.use(store)
app.use(VueToast)
app.use(VCalendar, {});
app.mount('#app')


// export const bus = createApp(App)d