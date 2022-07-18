import {  html } from '@hydrofoil/shaperone-wc'
import type { MultiEditorComponent } from '@hydrofoil/shaperone-wc'
import { quad, namedNode, literal } from '@rdf-esm/data-model'
import type { MultiEditor, Lazy } from '@hydrofoil/shaperone-core'
import { vcard, dash, rdf, rdfs } from '@tpluscode/rdf-ns-builders'
import { turtle } from '@tpluscode/rdf-string'
import { ns } from '../namespaces'
import { readOnly } from './utils/readonly'
// export const matcher: MultiEditor = {
//   term: editor,
//   match(shape) {
//     return shape.pathEquals(vcard.language) ? 50 : 0
//   },
// }

// export function * metadata() {
//   yield quad(editor, rdf.type, dash.MultiEditor)
//   yield quad(editor, rdfs.label, literal('Language combobox'))
// }

export const multiSelect = function ({ property, value, updateComponentState }, { update }) {
console.log("🚀 . multiSelect . value", value)

    // let options = []
    // const rawRDF = property.shape.pointer.dataset;

    // let quads = rawRDF.match(null, ns.rdf.type, property.shape.pointer.out(ns.sh.class).term)
    // let quadSubjects = [...quads.quads].map(q => q.subject)

    // quadSubjects.forEach(o => {
        
    //     options.push(
    //         {   
    //             id: o.value,
    //             term: property.shape.pointer.namedNode(o.value).term,
    //             label: property.shape.pointer.namedNode(o.value).out(ns.rdfs.label).value,
    //         }
    //     )
    // })

    // const selected = property.objects.
    //     map(o => o.object.out(ns.rdfs.label).value).
    //     filter(o => o)
    // console.log("🚀 . init . options", options)  
    
      function setValues(e: any) {
        const newSelection = e.target.selectedItems
        console.log("🚀 . setValues . newSelection", newSelection)

        let newRealSelection = newSelection
        .map(sel => sel.label || sel)
        .map(sel => {
            return value.componentState.options.find(opt => {
                return opt.label == sel
            })
        })
            
        console.log("🚀 . setValues . newRealSelection", newRealSelection)
        updateComponentState({selected: newRealSelection})
        update(newRealSelection.map((lang: any) => lang.term))
      }

      function scrollDownBecauseTheMultiselectComboIsBuggy(e: any) {
        window.scrollBy(0,500);
      }

      return html`
      <div
        @click="${scrollDownBecauseTheMultiselectComboIsBuggy}">
        <multiselect-combo-box 
            allow-custom-values
            item-id-path="id" 
            item-label-path="label"
            .selectedItems="${value.componentState.selected}"
            .items="${value.componentState.options}"
            .invalid="${property.hasErrors}"
            .errorMessage="${property.validationResults.map(({ result }) => result.resultMessage).join('; ')}"
            ${readOnly(property)}
            @change="${setValues}">
        </multiselect-combo-box>
    </div>`
    }
