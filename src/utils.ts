const { parsers } = await import('@rdfjs-elements/formats-pretty')
import rdfFetch from '@rdfjs/fetch'
import clownface, {  } from 'clownface'
import type { DatasetResponse } from '@rdfjs/fetch-lite';
import type { DatasetCore } from '@rdfjs/dataset'

export async function fetchShape(shapeName: string) {
    const res: DatasetResponse<DatasetCore> = await rdfFetch('http://localhost:3001/shape/' + shapeName)
    const dd = await res.dataset()
    console.log("fetched shape: ", dd)
    return clownface({ dataset: dd })
}