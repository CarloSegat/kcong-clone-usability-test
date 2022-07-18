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

        console.log("🚀 . init . property", property)
        
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
                console.log("🚀 . subjects", subjects)
                let pointers = []
                subjects.forEach(q => {
                    console.log("🚀 . q.value.subject", q.subject.value)
                    let smallDataset = dataset(quads).match(q.subject, null, null)
                    pointers.push(clownface({dataset: smallDataset}).namedNode(q.subject))
                });
                
                for (const pointer of pointers) {
                    options.push({
                        id: pointer.term.value,
                        term: pointer,
                        label: pointer.out(ns.rdfs.label).value ,
                      })
                    console.log("🚀 . options", options)
                }

                let selected = []
                if(property.objects && property.objects.length > 0) {
                    const values = property.objects.map(o => o.object)
                    selected = options.filter(lang => values.find(object => object?.term.equals(lang.term.term)))
                    console.log("🚀 . selected", selected)

                    
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