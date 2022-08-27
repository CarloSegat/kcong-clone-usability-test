import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { sh } from '@tpluscode/rdf-ns-builders/strict';
import { taggedLiteral } from '@rdfjs-elements/lit-helpers/taggedLiteral.js';
export * from '@hydrofoil/shaperone-wc/renderer/decorator';
import { ns } from '../namespaces';
import { plusIcon } from '../assets/icons/icons'
import { alignItemsVerticalCenterCSS, noBordersCSS, fieldContainerCSS, hooverCSS } from '../assets/style';

export function property(renderer, { property }) {

    const { actions } = renderer
    const shapeNode = getThisShape();

    const asteriskHTML = generateHTMLAsteriskForMandatoryProp();

    const validationMessageHTML = generateHTMLValidationMessage();

    const addButtonHTML = generateHTMLAddButton()

 

    return html`
        ${alignItemsVerticalCenterCSS}
        ${fieldContainerCSS}
        ${noBordersCSS}
        ${hooverCSS}
        ${addButtonHTML}
        <style>
        
            textarea {
                width: var(--field-width);
            }

        </style>
        <!-- hack to avoid rendering a multiSelect element n times where n is the number of selected items -->
        ${repeat(isMultiSelect() ? [property.objects[0]] : property.objects, object => html`
        
            <div class="fieldContainer">
                <div>
                    <label for="${property.shape.id.value}">
                        ${taggedLiteral(property.shape, { property: sh.name })}
                    </label>
                    ${asteriskHTML}
                    ${validationMessageHTML}
                </div>
                ${renderer.renderObject({ object })}
            </div>
        `)}`;

    function generateHTMLAddButton() {
        
        return !property.selectedEditor && property.canAdd && ! isMultiSelect()
            ? html`
                <button 
                    class='alignItemsVerticalCenter noBorders hoover'
                    style='margin-bottom: -2rem;'
                    @click="${(e) => {
                    e.preventDefault();
                    actions.addObject();
                }}" 
                    title="Add value">
                        ${plusIcon} 
                    <div
                        // style='font-size: var(--font-size)'    
                    >
                        Add ${taggedLiteral(property.shape, { property: sh.name })}
                    </div>
                </button>`
            : html``;

    }

    function generateHTMLValidationMessage() {
        let validationMessageHTML = html``;
        if (property.validationResults.length > 0) {
            const validationClownface = property.validationResults[0].result.pointer;
            const validationMessage = validationClownface.has(ns.sh.sourceShape, shapeNode.term).out(ns.sh.resultMessage).value;
            validationMessageHTML = html`<span style='color:var(--error-red);
        ;'>${validationMessage}</span>`;
        }
        return validationMessageHTML;
    }

    function generateHTMLAsteriskForMandatoryProp() {
        const minCount = shapeNode.out(ns.sh.minCount).value;
        const severityNodeValue = shapeNode.out(ns.sh.severity).value;
        let isSevereViolation = true;
        if(severityNodeValue !== undefined) {
            isSevereViolation = ! shapeNode.out(ns.sh.severity).value.includes('Info');
        }
        
        
        let asterisk = minCount === '1' && isSevereViolation ? html`<span>*&nbsp</span>` : html``;
        return asterisk;
    }

    function getThisShape() {
        // a shape includes both nodeShape and propertyShape
        const cf = property.shape.pointer;
        const shapeNode = cf.has(ns.sh.name, property.name);
        return shapeNode;
    }

    function isMultiSelect() {
        return shapeNode.out(ns.dash.editor).value?.includes("MultiSelect") || false;
    }
}