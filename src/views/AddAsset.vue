<template>
    <div class="contentSection">
        <h1>Adding assets of type <b>{{this.$route.params.asset_type}}</b></h1>
        <div v-if="bodyShapeClown !== null">
            <shaperone-form-gen
                .bodyShape="bodyShapeClown"
                @cefriel-form-submitted="formSubmittedCallback">
            </shaperone-form-gen>
        </div>
    </div>
    <Footer/>
</template>

<script>
import { generateQuads, hardcodedAssetTypeToNameNodeMap } from '../utils'
import clownface from 'clownface'
import { dataset } from '@rdf-esm/dataset'
import Footer from '../components/Footer.vue'

export default {
    name: "AddAsset",
    components: {
        Footer
    },
    async created() {
        console.log("this.$route.params.asset_type", this.$route.params.asset_type);
        const r = await fetch("http://localhost:8000/api/shacl-forms/"+this.$route.params.asset_type)
        const asset_schema = await r.json();
        const bodyShapeQuads = await generateQuads(asset_schema.body_shape)
        this.bodyShapeClown = clownface({dataset: dataset(bodyShapeQuads)})
                              .namedNode(hardcodedAssetTypeToNameNodeMap[this.$route.params.asset_type])
    },
    data() {
        return {
            bodyShapeClown: null
        }
    },
    methods: {
        formSubmittedCallback: async function(e) {
            const rdfString = e.detail.data;
            const body = {
                rdf_data: rdfString,
                uri: e.detail.uri,
                name: e.detail.name
            }
            const response = await fetch("http://localhost:8000/api/shacl-form-assets/"+this.$route.params.asset_type, 
                {   
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            )
            const responseJson = await response.json();
            if(response.ok){
                this.$router.push({ 
                name: 'AssetView', 
                params: { 
                    asset_name: responseJson.asset_name,
                    asset_type: responseJson.asset_type,
                    asset_uri: responseJson.asset_uri,
                    asset_id: responseJson.asset_id,
                    isJustAdded: true,
                } 
            })
            }
        }
    }
}

</script>

<style scoped>
@import "../assets/base.css";
</style>