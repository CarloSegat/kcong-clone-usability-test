<template>


<div>
    <div>
        <h1>Assets page of {{this.$route.params.asset_type}}</h1>
    </div>
    <div
        @click="e => this.$router.push({ name: 'AddAsset', params: { asset_type: this.$route.params.asset_type } })"
    >ADD</div>
</div>
<div><h2>Assets availbale:</h2></div>

<ul>
    <li v-for="asset in assets"
        :key="asset.name"
         @click="e => {
            // this.$router.push({ name: 'AssetView', params: { name: asset_type.name } })
            // TODO view single asset
         }"
    >
        {{asset.name}}
    </li>
</ul>
</template>

<script>
export default {
    name: "AssetsView",
    async created() {
        console.log("this.$route.params.asset_type", this.$route.params.asset_type);
        const r = await fetch("http://localhost:8000/api/shacl-form-assets/all/"+this.$route.params.asset_type)
        this.assets = await r.json();

    },
    data() {
        return {
            assets: []
        }
    }
}
</script>

<style scoped>
@import "../assets/base.css";
</style>