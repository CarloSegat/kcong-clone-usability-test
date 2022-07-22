import {  html } from '@hydrofoil/shaperone-wc'
import type { MultiEditorComponent } from '@hydrofoil/shaperone-wc'
import { quad, namedNode, literal } from '@rdf-esm/data-model'
import type { MultiEditor, Lazy } from '@hydrofoil/shaperone-core'
import { vcard, dash, rdf, rdfs } from '@tpluscode/rdf-ns-builders'
import { turtle } from '@tpluscode/rdf-string'
import { ns } from '../namespaces'
import { readOnly } from './utils/readonly'

export const multiSelect = function ({ property, value, updateComponentState }, { update }) {

      function setValues(e: any) {
        const newSelection = e.target.selectedItems

        let newRealSelection = newSelection
        .map(sel => sel.label || sel)
        .map(sel => {
            return value.componentState.options.find(opt => {
                return opt.label == sel
            })
        })
            
        updateComponentState({selected: newRealSelection})
        update(newRealSelection.map((lang: any) => lang.term))
      }

      function scrollDownBecauseTheMultiselectComboIsBuggy(e: any) {
        window.scrollBy(0,150);
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
            @change="${setValues}"
            @focusout=${() => window.scrollBy(0,-150)}>
        </multiselect-combo-box>
    </div>`
    }
