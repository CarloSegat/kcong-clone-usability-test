import type { SingleEditorComponent } from '@hydrofoil/shaperone-wc'
import { html } from '@hydrofoil/shaperone-wc'
import { dash } from '@tpluscode/rdf-ns-builders'
import type { GraphPointer } from 'clownface'
import type { FocusNode } from '@hydrofoil/shaperone-core'
import { validity } from '../utils/validity';
import { ns } from '../../namespaces'

function isFocusNode(value?: GraphPointer): value is FocusNode {
  return value?.term.termType === 'NamedNode' || value?.term.termType === 'BlankNode'
}


export const nestedForm: SingleEditorComponent = {
  editor: dash.DetailsEditor,

  render({ value, renderer, property: { shape: { node } } }) {

    // const hasMoreThan1Field = node.pointer.out(ns.sh.property).terms.length > 1
    // console.log("🚀 . render . aa", hasMoreThan1Field)

    const focusNode = value.object

    if (isFocusNode(focusNode)) {

      renderer.property.componentState

      return html` 
      <style>
          .nested-container {
              border: darkgray;
              border-width: 0.15rem;
              border-style: inset;
              padding: 0.75rem;
              width: fit-content;
              display: inline-flex;
          }
        </style>
        <div
          ${validity(value)}
          class="nested-container"
          >
          ${renderer.renderFocusNode({ focusNode, shape: node })}
        </div>`
    }

    return html`Something went wrong with custom nested shape component`
  },
}   

