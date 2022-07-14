<template>
  <rdf-editor 
    class="scrollable"
    id="resourceEditor" 
    prefixes="sh,dash,rdfs"
    .value="rdfdata"
    format="text/turtle">
  </rdf-editor>
</template>

<script lang="js">
//import $rdf from 'rdf-ext'  
import '@hydrofoil/shaperone-wc/shaperone-form'
import clownface, { AnyPointer, GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import { dataset, blankNode } from '@rdf-esm/dataset'
import { sh, rdf } from '@tpluscode/rdf-ns-builders'
import {ns} from '../shacl-form-generator/namespaces'
import fetch from '@rdfjs/fetch'
import { ref } from 'vue'
import '@rdfjs-elements/rdf-editor'

export default {
    name: 'display-rdf',
    props: {
      rdfdata: String
    },
}
</script>

<style scoped>
@import '../assets/base.css';
  .scrollable {
    height: 90vh;
}
</style>
