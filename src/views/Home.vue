<template>
<div>
  <h1>DCAT-AP Metadata Catalogue</h1>
  <summary>This metadata catalogue is for datasets that conform to the DCAT Application Profile (DCAT-AP)</summary>
</div>
<div>
  <h2>Asset Types</h2>
  <div
    style='display: flex; gap: 0.5rem; flex-direction: row;'>
    <AssetTypeComponent v-for="asset_type in asset_types"
      :key="asset_type.name"
      :name="asset_type.name"
      :description="asset_type.description"
      @click="e => this.$router.push({ 
        name: 'AssetsView', 
        params: { asset_type: asset_type.name, description: asset_type.description } 
      })">
    {{ asset_type.name }}
    </AssetTypeComponent>
  </div>
</div>
</template>

<script>
import AssetTypeComponent from '../components/AssetTypeComponent.vue'
  export default {
    name: "Home",
    components: {AssetTypeComponent},
    data() {
      return {
        asset_types: []
      }
    },
    async created() {
      let response = await fetch('http://localhost:8000/api/shacl-forms/')
      
      this.asset_types = await response.json()
      console.log("this.asset_types ", this.asset_types);
    }
  }
</script>

<style scoped>
@import "../assets/base.css";
</style>