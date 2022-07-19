import { html } from 'lit';
import { getType } from '../utils/textFieldType';
import { validity } from '../utils/validity';
import { readOnly } from '../utils/readonly';
import { thinBorderBottomCSS, fieldCSS } from '../../assets/style';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    })
    
 }

export const fileInput = function ({ property, value }, { update }) {

    var _a;

    return html`
        ${fieldCSS}
        
    <input type="file"
        id="file_upload" 
        style='margin-top:0.5rem;'
        name="file_upload"
        class='field'
        ${validity(value, property)}
        ${readOnly(property)}
        accept="*"
        @input="${async (e) => {
            console.log(e.target.files[0].name)
            let base64file = await getBase64(e.target.files[0])
            update(base64file)
        }}"
        >`
};