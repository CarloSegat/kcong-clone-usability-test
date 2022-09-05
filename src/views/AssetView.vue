<template>
  <div class="contentSection">
    <h1>{{ this.$route.params.asset_name }}</h1>
    
    <button
        class="topButton"
        @click="e => {
                    this.$router.push({ 
                        name: 'EditAsset', 
                        params: { 
                            asset_name: this.$route.params.asset_name,
                            asset_type: this.$route.params.asset_type,
                            asset_uri: this.$route.params.asset_uri,
                            asset_id: this.$route.params.asset_id
                        } 
                    })
                }"
      >
        Edit
      </button>

      <button
        class="topButton"
        @click="
          (e) =>
            this.$router.push({
              name: 'AddAsset',
              params: {
                asset_type: this.$route.params.asset_type,
                isJustAdded: true,
              },
            })
        "
      >
        Create {{ this.$route.params.isJustAdded ? "another" : "a new" }} Asset
      </button>
      <button
        class="topButton"
        @click="
          (e) =>
            this.$router.push({
              name: 'AssetsView',
              params: {
                asset_type: this.$route.params.asset_type,
              },
            })
        "
      >
        View All Assets
      </button>

      <div style="margin-top: 0.67rem;">
        <h3 style="width: fit-content">
          Asset type: {{ this.$route.params.asset_type }}
        </h3>
      </div>

      <div>
        <semantic-form-gen
          v-if="clownfaceShape !== null && this.assetClownface  !== null"
          .shape="clownfaceShape"
          .resource="assetClownface"
          .readonly="true"
        ></semantic-form-gen>
      </div>

  </div>
  <Footer />
</template>

<script>
import { generateQuads, hardcodedAssetTypeToNameNodeMap } from "../utils";
import clownface from "clownface";
import { dataset } from "@rdf-esm/dataset";
import { namedNode } from "@rdfjs/data-model";
import Footer from "../components/Footer.vue";

export default {
  name: "AssetView",
  components: {
    Footer,
  },
  async created() {
    const assetReq = await fetch(
      "http://localhost:8000/api/shacl-form-assets/" +
        this.$route.params.asset_type +
        "/" +
        this.$route.params.asset_id
    );
    const temp = await assetReq.json();
    const assetQuads = await generateQuads(temp.rdf_data);
    this.assetClownface = clownface({ dataset: dataset(assetQuads) }).namedNode(
      temp.uri
    );
      console.log("🚀 ~ file: AssetView.vue ~ line 95 ~ created ~ this.$route.params.asset_uri", this.$route.params.asset_uri)

    const assetTypeReq = await fetch(
      "http://localhost:8000/api/shacl-forms/" + this.$route.params.asset_type
    );
    const temp2 = await assetTypeReq.json();
    const bodyShapeQuads = await generateQuads(temp2.body_shape);
    console.log("🚀 ~ file: AssetView.vue ~ line 102 ~ created ~ bodyShapeQuads", bodyShapeQuads)
    this.clownfaceShape = clownface({
      dataset: dataset(bodyShapeQuads),
    }).namedNode(
      hardcodedAssetTypeToNameNodeMap[this.$route.params.asset_type]
    );
  },
  data() {
    return {
      assetClownface: null,
      clownfaceShape: null,
    };
  },
};
</script>

<style scoped>
@import "../assets/base.css";

.topButton {
  height: fit-content;
  white-space: nowrap;
  width: 12rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.33rem;
  border-width: thin;
  background-color: var(--vt-c-white-mute);
  margin-right: 1rem;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>