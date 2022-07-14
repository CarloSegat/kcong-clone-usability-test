import { html } from 'lit';
import { getType } from '../utils/textFieldType';
import { validity } from '../utils/validity';
import { readOnly } from '../utils/readonly';
import { thinBorderBottomCSS, fieldCSS } from '../../assets/style';

export const textField = function ({ property, value }, { update }) {
    var _a;

    return html`
        ${thinBorderBottomCSS}
        ${fieldCSS}
    <input 
        class='thinBorderBottom field'
        part="${property.hasErrors ? 'invalid' : ''}"
        .value="${((_a = value.object) === null || _a === void 0 ? void 0 : _a.value) || ''}"
            type="${getType(property.datatype)}"
            ${validity(value, property)}
            ${readOnly(property)}
            @blur="${(e) => update(e.target.value)}"
    >`;
};