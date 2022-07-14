<template>
 <h1>The test</h1>

  <custom-f
    .headerShape="headerShape"
    .bodyShape="bodyShape"
    .instancesURL="[]"
  ></custom-f>

</template>

<script lang="ts">
import '../../src/cefrielForm'
import CreateNew from '../../src/components/VueFormWrapper.vue'
import DisplayRDF from '../../src/components/DisplayRDF.vue'
import stringToStream from 'string-to-stream'
import { log } from 'console'
const { parsers } = await import('@rdfjs-elements/formats-pretty')
import clownface, { AnyPointer, GraphPointer } from 'clownface'
import type { RdfFetchResponse, DatasetResponse } from '@rdfjs/fetch-lite';
import { dataset, DatasetCore } from '@rdfjs/dataset'
import {ns} from "../../src/namespaces";

export default {
    name: 'cypressFormTest',
    data() {
      return {
        headerShape: null,
        bodyShape: null,
        res: null,
      }
    },
    methods: {
      async getResource(txt){
        const inputStream = stringToStream(txt)
        const quads = []
        const prefixes = {}

        const quadStream = parsers.import("text/turtle", inputStream)
        if (!quadStream) {
          console.log("quadStream was null, something bad happened");
        }
        if(quadStream !== null){
            for await (const quad of quadStream) {
              quads.push(quad)
            }
        }
        return clownface({ dataset: new dataset(quads) })
      }
    },
    async mounted(){

      
      
      let txtResponse = `
        @prefix sh: <http://www.w3.org/ns/shacl#> .
        @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
        @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
        @prefix dash: <http://datashapes.org/dash#> .
        @prefix dcat: <http://www.w3.org/ns/dcat#> .
        @prefix dct: <http://purl.org/dc/terms/> .
        @prefix cfrl: <http://www.cefriel.com/shacl-forms#> .
        @prefix schema: <http://schema.org/> .
        @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

        cfrl:HeaderShape a sh:NodeShape ;
            sh:targetClass dcat:Dataset ;
            rdfs:label "Header shape" ;
            sh:property
            cfrl:DctTitleProperty ,
            cfrl:DctDescProperty ,
            cfrl:OptionalProperty ,
            cfrl:DctTypeProperty .

        # description
        cfrl:DctDescProperty
            sh:path dct:description ;
            sh:name "Description" ;
            sh:datatype xsd:string ;
            dash:singleLine true ;
            sh:maxCount 1 ;
            sh:minCount 1 .

        # optional property
        cfrl:OptionalProperty
            sh:path cfrl:optionalProperty ;
            sh:name "Optional 4-digits code" ;
            sh:datatype xsd:string ;
            sh:pattern "[0-9][0-9][0-9][0-9]" ;
            dash:singleLine true .


        # title
        cfrl:DctTitleProperty
            sh:path dct:title ;
            sh:name "Title" ;
            sh:datatype xsd:string ;
            dash:singleLine true ;
            sh:maxCount 1 ;
            sh:minCount 1 .

        # type
        cfrl:DctTypeProperty
            sh:path rdf:type ;
            sh:name "Dct type" ;
            dash:editor dash:InstancesSelectEditor ;
            dash:hidden true ;
            sh:class cfrl:AssetType ;
            sh:minCount 1 ;
            sh:maxCount 1 .
      `

      const txtResponseBody = `
          @prefix sh: <http://www.w3.org/ns/shacl#> .
          @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
          @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
          @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
          @prefix dash: <http://datashapes.org/dash#> .
          @prefix dcat: <http://www.w3.org/ns/dcat#> .
          @prefix dct: <http://purl.org/dc/terms/> .
          @prefix cfrl: <http://www.cefriel.com/shacl-forms#> .
          @prefix schema: <http://schema.org/> .

          cfrl:SoftwareShape
              a sh:NodeShape ;
              sh:targetClass cfrl:SoftwareAsset ;
              rdfs:label "A piece of software" ;
              sh:property
                  cfrl:SchemaNameProperty ,
                  cfrl:SchemaDatePublished ,
                  cfrl:DctDescProperty .

          # name
          cfrl:SchemaNameProperty
              sh:path schema:name ;
              sh:name "Name" ;
              sh:datatype xsd:string ;
              dash:singleLine true ;
              sh:maxCount 1 ;
              sh:minCount 1 .

          # name
          cfrl:SchemaDatePublished
              sh:path schema:datePublished ;
              sh:name "Date published" ;
              sh:datatype xsd:date ;
              sh:maxCount 1 ;
              sh:minCount 1 .

          # owners
          cfrl:OwnersProperty
              a sh:PropertyShape ;
              sh:path cfrl:owners ;
              sh:name "Owners" ;
              dash:viewer dash:DetailsViewer ;
              sh:node cfrl:OwnerShape ;
              sh:class cfrl:Person ;
              sh:minCount 1 .

          # contact
          cfrl:ContactProperty
              a sh:PropertyShape ;
              sh:path cfrl:contact ;
              sh:name "Contact" ;
              sh:datatype xsd:string ;
              sh:maxCount 1 ;
              sh:minCount 1 .

          cfrl:OwnerShape
              a sh:NodeShape ;
              sh:targetClass cfrl:Person ;
              rdfs:label "The person responsible for a ML model" ;
              sh:property
              cfrl:SchemaNameProperty ,
              cfrl:ContactProperty .

          # description
          cfrl:DctDescProperty
              sh:path dct:description ;
              sh:name "Description" ;
              sh:datatype xsd:string ;
              dash:singleLine true ;
              sh:maxCount 1 ;
              sh:minCount 1 .
      `
    
      this.headerShape = (await this.getResource(txtResponse)).namedNode(ns.cfrl.HeaderShape)
      this.bodyShape = (await this.getResource(txtResponseBody)).namedNode(ns.cfrl.SoftwareShape)
      // this.res = clownface({ dataset: new dataset() })
      //   .namedNode("http://aTestUriForTesting")
      //   .addOut(ns.rdf.type, ns.dcat.Dataset)
    }
}
</script>

<style scoped>
@import '../../src/assets/base.css';
  .grid-container {
    display: grid;
    gap: 0.75rem;
    row-gap: 1.25rem;
    grid-template-columns: 45vw 45vw;
  }

  .item-grid-left {
    grid-column-start: 1;
    grid-column-end: 1;
  }

</style>