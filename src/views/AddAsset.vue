<template>
<h1>Adding assets of type <b>{{this.$route.params.asset_type}}</b></h1>
<div>
    <shaperone-form-gen
    .bodyShape="bodyShapeClown"
    @cefriel-form-submitted="formSubmittedCallback"
  ></shaperone-form-gen>
</div>
</template>

<script>
import { generateQuads, ns } from '../utils'
import clownface from 'clownface'
import { dataset } from '@rdf-esm/dataset'

export default {
    name: "AddAsset",
    async created() {
        console.log("this.$route.params.asset_type", this.$route.params.asset_type);
        const r = await fetch("http://localhost:8000/api/shacl-forms/"+this.$route.params.asset_type)
        this.asset_schema = await r.json();
        const bodyShapeQuads = await generateQuads(this.asset_schema.body_shape)
        this.bodyShapeClown = clownface({dataset: dataset(bodyShapeQuads)})
                              .namedNode(this.hardcodedAssetTypeToNameNodeMap[this.$route.params.asset_type])
        console.log("🚀 . created . this.bodyShapeClown", this.bodyShapeClown)
    },
    data() {
        return {
            bodyShapeClown: {},
            hardcodedAssetTypeToNameNodeMap: {
                'simpleTest': ns.cfrl.PetShape
            }
        }
    },
    methods: {
        formSubmittedCallback: function(e) {
            console.log("🚀 . e", e)
        }
    }
}

</script>

<style scoped>
@import "../assets/base.css";
</style>