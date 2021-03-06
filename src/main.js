import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/scss/main.scss";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/_variables.scss"


createApp(App).use(store).use(router).mount('#app')
