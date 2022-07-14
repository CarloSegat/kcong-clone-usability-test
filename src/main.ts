import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './shacl-form-generator/shaclFormGenerator'

import ShapeFormOutput from "./views/ShapeFormOutput.vue";

const routes = [
  { 
    path: '/', 
    component: ShapeFormOutput, 
    name: "Home" 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

const app = createApp(App).use(router).mount('#app')
