import { dash } from '@tpluscode/rdf-ns-builders';
import { html } from "@hydrofoil/shaperone-wc";
import { repeat } from 'lit/directives/repeat.js';
import { label } from './utils/label';
import { sort } from './utils/sort';


export const textFieldEditor = {
    editor: dash.TextFieldEditor,
    async lazyRender() {
        return (await import('./textField/myTextField')).textField;
    },
};

export const fileInputEditor = {
    editor: dash.FileInput,
    async lazyRender() {
        return (await import('./fileInput/fileInput')).fileInput;
    },
};

export const textArea = {
    editor: dash.TextAreaEditor,
    async lazyRender() {
        return (await import('./textArea')).textArea;
    },
};

export const instanceSelect = {
    editor: dash.EnumSelectEditor,
    async lazyRender() {
        return (await import('./instanceSelect/instanceSelect')).instanceSelect;
    },
    init({ focusNode, form, property, value: { componentState }, updateComponentState }) {
        if (!componentState.choices && !componentState.loading) {
            updateComponentState({
                loading: true,
            });
            (async () => {
                const pointers = await this.loadChoices({ focusNode, property: property.shape });
                const choices = pointers.map(ptr => [ptr, this.label(ptr, form)])
                    .sort(this.sort);
                updateComponentState({
                    choices,
                    ready: true,
                    loading: false,
                });
            })();
            return false;
        }
        return !componentState.loading;
    },
    async loadChoices({ property }) {
        return property.pointer.node(property.in).toArray();
    },
    label,
    sort,
};