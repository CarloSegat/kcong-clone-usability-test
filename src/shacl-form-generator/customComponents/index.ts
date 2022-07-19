import { dash } from '@tpluscode/rdf-ns-builders';
import { html } from "@hydrofoil/shaperone-wc";
import { repeat } from 'lit/directives/repeat.js';
import { label } from './utils/label';
import { sort } from './utils/sort';
import { ns } from '../namespaces';
import stringToStream from 'string-to-stream';
import { dataset } from '@rdf-esm/dataset'
import clownface from 'clownface';

export const textFieldEditor = {
    editor: dash.TextFieldEditor,
    async lazyRender() {
        return (await import('./textField/myTextField')).textField;
    },
};

export const datePickerEditor = {
    editor: dash.DatePickerEditor,
    async lazyRender() {
        return (await import('./datePicker')).datePicker('date');
    },
};

export const multiSelectEditor = {
    editor: dash.MultiSelect,
    async lazyRender() {
        await import(`multiselect-combo-box/multiselect-combo-box`)
        return (await import('./multiSelect')).multiSelect;
    },
    async generateQuads(strShapes: string)  {
        // let strShapes = triples.toString();
        const { parsers } = await import('@rdfjs-elements/formats-pretty')
    
        const inputStream = stringToStream(strShapes)
        const quads = []
    
        const quadStream = parsers.import("text/turtle", inputStream)
        if (!quadStream) {
            console.log("quadStream was null, something bad happened");
        }
        if(quadStream !== null){
            for await (const quad of quadStream) {
            quads.push(quad)
            }
        }
        return quads
    },
    init({ focusNode, form, property, value: { componentState }, updateComponentState }) {

        
        if(!componentState.options && !componentState.loading) {
            updateComponentState({
                loading: true,
            });
            (async () => {
                let options = []
                const res = await fetch(property.shape.pointer.out(dash.url).value);
                const resJson = await res.json();
                const quads = await this.generateQuads(resJson)
                let subjects = dataset(quads).match(null, ns.rdf.type, null).quads
                let pointers = []
                subjects.forEach(q => {
                    let smallDataset = dataset(quads).match(q.subject, null, null)
                    pointers.push(clownface({dataset: smallDataset}).namedNode(q.subject))
                });
                
                for (const pointer of pointers) {
                    options.push({
                        id: pointer.term.value,
                        term: pointer,
                        label: pointer.out(ns.rdfs.label).value ,
                      })
                }

                let selected = []
                if(property.objects && property.objects.length > 0) {
                    const values = property.objects.map(o => o.object)
                    selected = options.filter(lang => values.find(object => object?.term.equals(lang.term.term)))
                }

                updateComponentState({
                    options,
                    selected: selected,
                    ready: true,
                    loading: false,
                })
            })();
            return false;
        }
        return !componentState.loading;
    }
    
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

export const InstancesSelectEditor = {
    editor: dash.InstancesSelectEditor,
    async lazyRender() {
        return (await import('./instanceSelect/instanceSelect')).instancesSelect;
    },
    shouldLoad({ value: { componentState } }) {
        return !componentState.instances;
    },
    init(params) {
        const { form, value, updateComponentState } = params;
        if (this.shouldLoad(params) && !value.componentState.loading) {
            updateComponentState({
                loading: true,
            });
            (async () => {
                const pointers = await this.loadChoices(params);
                const instances = pointers.map(ptr => [ptr, this.label(ptr, form)])
                    .sort(this.sort);
                updateComponentState({
                    instances,
                    ready: true,
                    loading: false,
                });
            })();
            return false;
        }
        return !value.componentState.loading;
    },
    async loadInstance({ property, value }) {
        return property.pointer.node(value);
    },
    async loadChoices({ property }) {
        if (property.shape.class) {
            return property.shape.pointer.any()
                .has(ns.rdf.type, property.shape.class.id)
                .toArray();
        }
        return [];
    },
    label,
    sort,
};