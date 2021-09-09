import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { VueWindowSizePlugin } from 'vue-window-size/option-api';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/nova/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


const app = createApp(App)
app.use(store)
app.use(VueWindowSizePlugin,{
    delay: 0,
  });
app.use(PrimeVue)
app.mount('#app')