<template>
    <div>
        <h1>{{this.$route.params.asset_name}}</h1>
        <div style="display: grid; grid-template-columns: 80% 20%">
            <div>
                <h3 style="width: fit-content">{{this.$route.params.asset_type}}</h3>
            </div>
           
                <button
                class="kcongButton"
                @click="e => this.$router.push({ 
                    name: 'AddAsset', 
                    params: { 
                        asset_type: this.$route.params.asset_type,
                        isJustAdded: true,
                    } 
                })"
            >
                Add {{ this.$route.params.isJustAdded ? 'Another' : 'an' }} Asset of this Type
            </button>
            <button
                class="kcongButton"
                @click="e => this.$router.push({ 
                    name: 'AssetsView', 
                    params: { 
                        asset_type: this.$route.params.asset_type,
                    } 
                })"
            >
                View All Assets of this Type
            </button>

        <div 
        style="grid-row-start: 2"
        v-if="bodyShapeClown !== null && this.asset !== null">
            <shaperone-form-gen
                .bodyShape="bodyShapeClown"
                .resource="assetClown"
                .readonly="true"
            ></shaperone-form-gen>
        </div>
            
        </div>
        
    </div>
    
    
    <div>
    </div>
</template>

<script>
import { generateQuads, hardcodedAssetTypeToNameNodeMap } from '../utils'
import clownface from 'clownface'
import { dataset } from '@rdf-esm/dataset'
import { namedNode } from '@rdfjs/data-model'

export default {
    name: "AssetView",
    async created() {
        const assetReq = await fetch("http://localhost:8000/api/shacl-form-assets/"+this.$route.params.asset_type+'/'+this.$route.params.asset_name)
        const temp = await assetReq.json();
        const assetQuads = await generateQuads(temp.rdf_data)
        this.assetClown = clownface({dataset: dataset(assetQuads)})
                              .namedNode(this.$route.params.asset_uri)

        const assetTypeReq = await fetch("http://localhost:8000/api/shacl-forms/"+this.$route.params.asset_type)
        const temp2 = await assetTypeReq.json();
        const bodyShapeQuads = await generateQuads(temp2.body_shape)
        this.bodyShapeClown = clownface({dataset: dataset(bodyShapeQuads)})
                              .namedNode(hardcodedAssetTypeToNameNodeMap[this.$route.params.asset_type])
    },
    data() {
        return {
            assetClown: null,
            bodyShapeClown: null
        }
    }
}
</script>

<style scoped>
@import "../assets/base.css";

.kcongButton {
    grid-column-start: 2;
    height:fit-content;
    min-height: 52px;
    min-width: 92px;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 0.33rem;
    border-width: thin;
    background-color: transparent;
    margin-bottom: 1rem;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}


</style>