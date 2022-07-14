/**
 * @packageDocumentation
 * @module @hydrofoil/shaperone-wc/templates
 */
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { taggedLiteral } from '@rdfjs-elements/lit-helpers/taggedLiteral.js';
export * from '@hydrofoil/shaperone-wc/renderer/decorator';
import { property } from './property';
import { object } from './object';
/**
 * Default implementation of {@link RenderTemplates} which outputs native HTML elements
 */
export const template = {
   
    editor: {
        notFound: () => html`No editor found for property`,
    },
    component: {
        notFound(editor) {
            var _a;
            const { editors } = this.context;
            return html`No component found for ${taggedLiteral((_a = editors.allEditors[editor.value]) === null || _a === void 0 ? void 0 : _a.meta, { fallback: editor.value })}`;
        },
        loading() {
            return html`Loading editor . . .`;
        },
        loadingFailed() {
            return html`Failed to load editor . . .`;
        },
        initializing() {
            return html`Initialising component . . .`;
        },
    },
    form(renderer) {
        const { focusStack } = renderer.context.state;
        const focusNode = focusStack[focusStack.length - 1];
        if (!focusNode) {
            return html``;
        }
        return renderer.renderFocusNode({ focusNode });
    },
    focusNode(renderer, { focusNode }) {
        return html`
        <style>
            input::part(invalid) {
                border-color: var(--error-red);
            }
            select::part(invalid) {
                border-color: var(--error-red);
            }
        </style>
        <form>
            <div class="fieldset" part="focus-node">
                ${repeat(focusNode.groups, group => renderer.renderGroup({ group }))}
            </div>
        </form>`;
    },
    group(renderer, { properties }) {
        const { actions } = renderer
        return html`
        <div>
            ${repeat(properties, property => renderer.renderProperty({ property }))}
        </div>
        `;
    },
    property,
    object,
    initialising: () => html`Initialising form`,
};
//# sourceMappingURL=templates.js.map