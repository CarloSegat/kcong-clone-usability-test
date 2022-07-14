import { html } from "@hydrofoil/shaperone-wc";
import { readOnly } from "../utils/readonly";
import { validity } from "../utils/validity";
import { repeat } from 'lit/directives/repeat.js';
import { thinBorderBottomCSS, fieldCSS } from "../../assets/style";

export const instanceSelect = function ({ property, value }, { update }) {
    const choices = value.componentState.choices || [];

    function updateHandler(e) {
        const chosen = choices[(e.target).selectedIndex - 1];
        if (chosen) {
            update(chosen[0].term);
        } else {
            // if you select something and then deselect it needs to forget previous value
            update("")
        }
    }

    return html`
        ${thinBorderBottomCSS}
        ${fieldCSS}
        <select  
            class='thinBorderBottom field'
            ${readOnly(property)} 
            @input="${updateHandler}"  
            ${validity(value, property)}
        >
        <option></option>
            ${repeat(choices, ([choice, label]) => {
                var _a;
                return html`<option 
                    ?selected="${choice.value === ((_a = value.object) === null || _a === void 0 ? void 0 : _a.value)}" 
                    value="${choice.value}">
                    ${label}
                    </option>`;
            })}
        </select>`;
};