import { html } from 'lit';
import { validity } from './utils/validity';
import { readOnly } from './utils/readonly';
import { thinBorderBottomCSS, fieldCSS } from '../assets/style';

export const datePicker = (type) => function ({ property, value }, { update }) {
    var _a;
    return html `
        ${thinBorderBottomCSS}
        ${fieldCSS}
        
        <input 
            class='thinBorderBottom field'
            .value="${((_a = value.object) === null || _a === void 0 ? void 0 : _a.value) || ''}"
            type="${type}"
            ${validity(value, property)}
            ${readOnly(property)}
            @blur="${(e) => update(e.target.value)}">
    `;
};