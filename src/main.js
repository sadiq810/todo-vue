import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import "@/assets/theme.min.css";
import Vue3Geolocation from 'vue3-geolocation';


createApp(App).use(store).use(router).use(Vue3Geolocation).mount('#app')
