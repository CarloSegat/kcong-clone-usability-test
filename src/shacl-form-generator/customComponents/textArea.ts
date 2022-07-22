import { validity } from './utils/validity';
import { readOnly } from './utils/readonly';
import { literal } from '@rdf-esm/data-model';
import { html } from 'lit';
import { fieldCSS } from '../assets/style';

export const textArea = function ({ property, value }, { update }) {
    var _a;
    return html `
    
    ${fieldCSS}
    <style>
    
        textarea[disabled] {
            resize: none;
            overflow: hidden;
            height: 8rem;
        }

    </style>
    <textarea style="font-family: 'Lato', sans-serif !important;"
        class="field"
        ${readOnly(property)} 
        @blur="${(e) => update(literal(e.target.value))}" 
        ${validity(value, property)}>${(_a = value.object) === null || _a === void 0 ? void 0 : _a.value}</textarea>`;
};