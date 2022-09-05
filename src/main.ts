import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './shacl-form-generator/shaclFormGenerator'

import Home from "./views/Home.vue";
import AssetsView from "./views/AssetsView.vue";
import AddAsset from "./views/AddAsset.vue";
import AssetView from "./views/AssetView.vue";
import EditAssetView from "./views/EditAssetView.vue";

const routes = [
  { 
    path: '/home', 
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
  { 
    path: '/asset/:asset_type/:asset_name/:asset_id', 
    component: AssetView, 
    name: "AssetView" 
  },
  { 
    path: '/asset/edit/:asset_type/:asset_name/:asset_id', 
    component: EditAssetView, 
    name: "EditAsset" 
  },
  { path: '/', 
    redirect: '/home' }
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

const app = createApp(App).use(router).mount('#app')
