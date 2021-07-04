import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { VueWindowSizePlugin } from 'vue-window-size/option-api';

const app = createApp(App)
app.use(store)
app.use(VueWindowSizePlugin,{
    delay: 0,
  });
app.mount('#app')