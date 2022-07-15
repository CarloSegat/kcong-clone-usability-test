<template>
<h1>{{this.$route.params.asset_name}}</h1>
<h3>{{this.$route.params.asset_type}}</h3>
<div v-if="bodyShapeClown !== null && this.asset !== null">
    <shaperone-form-gen
        .bodyShape="bodyShapeClown"
        .resource="assetClown"
        .readonly="true"
  ></shaperone-form-gen>
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
</style>