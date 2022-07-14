import App from './App.vue';
import { mount } from 'cypress/vue'
const { parsers } = await import('@rdfjs-elements/formats-pretty')
import clownface from 'clownface'
import { dataset, DatasetCore } from '@rdfjs/dataset'
import stringToStream from 'string-to-stream'

async function getResource(txt: string) {
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

describe('form.cy.ts', () => {

  

  beforeEach(() => {
    // cy.fixture('headerShape.ttl').as("headerShape")
    cy.fixture('headerShape.ttl').then((txt) => {
      console.log(txt);
      let shape = clownface({dataset: getResource(txt)})
      cy.wrap(shape).as("headerShape")
    })
  })

  it('playground', () => {
   
    
    // Cypress.Blob.base64StringToBlob(cy.get('headerShape'), 'text')
    // console.log("headerShape headerShape headerShape", );
    
    mount(App)
  })
})