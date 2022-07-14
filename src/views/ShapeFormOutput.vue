<template>
  <div class="grid-container">
    <div class="item-grid-1">
      <h2>RDF Output</h2>
      <div style="padding: 0.25rem">
        <DisplayRDF 
        v-bind:rdfdata="shapeString" 
        @quads-changed="quadsChangedCallback"
        />
      </div>
    </div>

    <div class="item-grid-2">
      <h2>Please add your pet</h2>
      <div style="padding: 0.25rem">
        <CreateNew
          :bodyShape="shapeClown"
          @form-submitted="(e) => setDataFromForm(e)"
        />
      </div>
    </div>

    <div class="item-grid-3">
      <h2>RDF Output</h2>
      <div style="padding: 0.25rem">
        <DisplayRDF v-bind:rdfdata="formOutput" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//import $rdf from 'rdf-ext'
import CreateNew from "../components/VueFormWrapper.vue";
import DisplayRDF from "../components/DisplayRDF.vue";
import { ns } from "@/shacl-form-generator/namespaces";
import { fetchShape } from "@/utils";
import { vcard, dash, rdf, rdfs } from "@tpluscode/rdf-ns-builders";
import { dataset, blankNode } from '@rdf-esm/dataset'
import clownface, { AnyPointer, GraphPointer, AnyContext } from 'clownface'


export default {
  name: "ShapeFormOutput",
  components: { CreateNew, DisplayRDF },
  data() {
    return {
      shapeString: `@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix schema: <http://schema.org/> .
@prefix cfrl: <http://www.cefriel.com/shacl-forms#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

cfrl:PetShape
  a sh:NodeShape ;
  sh:targetClass cfrl:Pet ;
  rdfs:label "Pet" ;
  sh:property
    cfrl:SchemaNameProperty ,
	  cfrl:PetTypeProperty ,
	  cfrl:UrlPictureProp ,
	  cfrl:OwnersProperty .

cfrl:SchemaNameProperty
    sh:path schema:name ;
    sh:name "Name" ;
    sh:datatype xsd:string ;
    dash:singleLine true ;
    sh:message "Please insert your pet's name" ;
    sh:maxCount 1 ;
    sh:minCount 1 .

cfrl:UrlPictureProp
    sh:path cfrl:urlToPicture ;
    sh:name "Picture URL" ;
    sh:datatype xsd:anyURI ;
    sh:pattern "http[a-zA-Z]*" ;
    dash:singleLine true ;
    sh:message "Please give a valid URL to your pet picture" ;
    sh:maxCount 1 ;
    sh:minCount 1 .

cfrl:PetTypeProperty
	sh:path cfrl:PetType ;
	sh:name "Type" ;
	sh:in ("Cat" "Dog" "Turtle") ;
  sh:message "Please specify what pet you have" ;
	sh:maxCount 1 ;
  sh:minCount 1 .

cfrl:OwnersProperty
  a sh:PropertyShape ;
  sh:path cfrl:owners ;
  sh:name "Owners" ;
  dash:viewer dash:DetailsViewer ;
  sh:node cfrl:OwnerShape ;
  sh:class cfrl:Person ;
  sh:message "Please fill all the required fields" ;
  sh:minCount 1 ;
  sh:maxCount 3 .

cfrl:OwnerProp
	sh:path cfrl:Age ;
	sh:name "Age" ;
	sh:maxCount 1 ;
	sh:datatype xsd:number .

cfrl:OwnerShape
  a sh:NodeShape ;
  sh:targetClass cfrl:Owner ;
  rdfs:label "The pet owner" ;
  sh:property
    cfrl:SchemaNameProperty ,
    cfrl:ContactProperty .

cfrl:ContactProperty
  a sh:PropertyShape ;
  sh:path cfrl:contact ;
  sh:name "Contact" ;
  sh:datatype xsd:string ;
  sh:maxCount 1 ;
  sh:minCount 1 .
`,
      shapeClown: null as any,
      formOutput: null as any,
    };
  },
  async created() {
    
  },
  methods: {
    setDataFromForm: function (mydata: string) {
      this.formOutput = mydata;
    },
    quadsChangedCallback: function(quads: any) {
      this.shapeClown = clownface({dataset: dataset(quads.detail.value)}).namedNode(ns.cfrl.PetShape)
    }
  },
};
</script>

<style scoped>
@import "../assets/base.css";
.grid-container {
  display: grid;
  gap: 0.5rem;
  row-gap: 1rem;
  grid-template-columns: 30vw 30vw 40vw;
}

.item-grid-1 {
  grid-column-start: 1;
  grid-column-end: 1;
}

.item-grid-2 {
  grid-column-start: 2;
  grid-column-end: 2;
}

.item-grid-3 {
  grid-column-start: 3;
  grid-column-end: 3;
}
</style>