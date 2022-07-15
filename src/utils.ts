const { parsers } = await import('@rdfjs-elements/formats-pretty')
import rdfFetch from '@rdfjs/fetch'
import clownface, {  } from 'clownface'
import type { DatasetResponse } from '@rdfjs/fetch-lite';
import type { DatasetCore } from '@rdfjs/dataset'
import namespace from '@rdfjs/namespace'
import stringToStream from 'string-to-stream';

export async function fetchShape(shapeName: string) {
    const res: DatasetResponse<DatasetCore> = await rdfFetch('http://localhost:3001/shape/' + shapeName)
    const dd = await res.dataset()
    console.log("fetched shape: ", dd)
    return clownface({ dataset: dd })
}

export const ns = {
  sh: namespace('http://www.w3.org/ns/shacl#'),
  cfrl: namespace('http://www.cefriel.com/shacl-forms#'),
  dash: namespace('http://datashapes.org/dash#'),
  dcat: namespace('http://www.w3.org/ns/dcat#'),
  rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
}

export async function generateQuads(strShapes: string)  {
    // let strShapes = triples.toString();
    const { parsers } = await import('@rdfjs-elements/formats-pretty')

    const inputStream = stringToStream(strShapes)
    const quads = []

    const quadStream = parsers.import("text/turtle", inputStream)
    if (!quadStream) {
        console.log("quadStream was null, something bad happened");
    }
    if(quadStream !== null){
        for await (const quad of quadStream) {
        quads.push(quad)
        }
    }
    return quads
}