import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.scss';
import Home from "./views/Home.vue";
import {createWebHistory, createRouter} from "vue-router";




const routes =[
  {path: '/', component: Home},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
