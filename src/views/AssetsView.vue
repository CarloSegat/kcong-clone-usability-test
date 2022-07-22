<template>
    <div class="contentSection">
        <div>
            <div style="display:flex; align-items: center">
                <h1>Assets of type {{this.$route.params.asset_type}}</h1>
                <div
                    class="addIconContainer"
                    @click="e => this.$router.push({ name: 'AddAsset', params: { asset_type: this.$route.params.asset_type } })"
                >
                <span>+</span>
                </div>
            </div>
            <div>
                <span>{{this.$route.params.description}}</span>
            </div>
            
        </div>
        <div><h2>Assets availbale:</h2></div>

        <div
            v-if="assets && assets.length > 0"
            class="containerAssetInstances">
            <AssetInstanceComponent 
            v-for="asset in assets"
                :name="asset.name"
                :uri="asset.uri"
                :key="asset.uri"
                @click="e => {
                    this.$router.push({ 
                        name: 'AssetView', 
                        params: { 
                            asset_name: asset.name,
                            asset_type: asset.asset_type,
                            asset_uri: asset.uri,
                            asset_id: asset.id
                        } 
                    })
                }"
            >
            </AssetInstanceComponent>
            <AddAssetComponent 
            :name="'Add new asset'"
            :uri="''"
            :key="12121212"
                @click="e => {
                    this.$router.push({ 
                        name: 'AssetView', 
                        params: { 
                            asset_name: asset.name,
                            asset_type: asset.asset_type,
                            asset_uri: asset.uri,
                            asset_id: asset.id
                        } 
                    })
                }"
            >
            </AddAssetComponent>
        </div>
    </div>
    <Footer/>
</template>

<script>
import AssetInstanceComponent from '../components/AssetInstanceComponent.vue'
import AddAssetComponent from '../components/AddAssetComponent.vue'
import Footer from '../components/Footer.vue'

export default {
    name: "AssetsView",
    components: {
        AssetInstanceComponent,
        Footer,
        AddAssetComponent
    },
    async created() {
        const r = await fetch("http://localhost:8000/api/shacl-form-assets/all/"+this.$route.params.asset_type)
        this.assets = await r.json();
        console.log("🚀 . created .  this.assets",  this.assets)
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

.containerAssetInstances {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.addIconContainer {
    cursor: pointer;
    margin-left : auto;
    border-radius: 100%;
    background-color: var(--vt-c-white-mute);
    font-size: 3.5rem; 
    width: 4rem; 
    height: 4rem; 
    line-height: 3.8rem; 
    text-align: center;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}

</style>