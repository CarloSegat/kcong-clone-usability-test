<template>
<div>
  <h1>DCAT-AP Metadata Catalogue</h1>
</div>
<div>
  <h2>Latest assets</h2>
</div>
<div>
  <h2>Asset Types</h2>
  <ul>
    <li v-for="asset_type in asset_types"
      :key="asset_type.name"
      @click="e => this.$router.push({ name: 'AssetsView', params: { asset_type: asset_type.name } })">
    {{ asset_type.name }}
</li>
  </ul>
</div>
</template>

<script>
  export default {
    name: "Home",
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