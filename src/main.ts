import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './shacl-form-generator/shaclFormGenerator'

import Home from "./views/Home.vue";
import AssetsView from "./views/AssetsView.vue";
import AddAsset from "./views/AddAsset.vue";

const routes = [
  { 
    path: '/', 
    component: Home, 
    name: "Home" 
  }, 
  { 
    path: '/assets-view/:asset_type', 
    component: AssetsView, 
    name: "AssetsView" 
  },
  { 
    path: '/add-asset/:asset_type', 
    component: AddAsset, 
    name: "AddAsset" 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

const app = createApp(App).use(router).mount('#app')
