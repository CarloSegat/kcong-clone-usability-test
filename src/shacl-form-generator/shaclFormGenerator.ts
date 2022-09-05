import { LitElement, css, html, type PropertyValueMap } from 'lit';
import { customElement, property, queryAsync, state } from 'lit/decorators.js';
import '@hydrofoil/shaperone-wc/shaperone-form'
import { dataset } from '@rdf-esm/dataset'
import { ns } from './namespaces'
import { turtle } from '@tpluscode/rdf-string'
import type { ShaperoneForm } from '@hydrofoil/shaperone-wc';
import clownface, { AnyPointer } from 'clownface'
import type NamedNode from 'rdf-js';
import rdfFetch from '@rdfjs/fetch'
// import type { component, editor, rendere } from '@hydrofoil/shaperone-wc/configure' 
import { components, renderer, validation } from '@hydrofoil/shaperone-wc/configure'
import { validate } from '@hydrofoil/shaperone-rdf-validate-shacl'
import { nestedForm } from './customComponents/nestedInlineForm'
import { template } from './template/template'
import { literal } from '@rdf-esm/data-model';
import { 
  textFieldEditor, 
  fileInputEditor, 
  textArea,
  multiSelectEditor,
  datePickerEditor,
  InstancesSelectEditor } from './customComponents';


import { paperPlane } from './assets/icons/icons';
import { thinBorderBottomCSS, alignItemsVerticalCenterCSS, hooverCSS, fieldContainerCSS } from './assets/style';
import stringToStream from 'string-to-stream';


@customElement('semantic-form-gen')
export class SemanticForm extends LitElement {

  static styles = css`
    :host {
      color: black;
      --error-red: red;
      --field-width: 25rem;
      --font-size: 1rem;
    }

    shaperone-form::part(invalid) {
      border-color: #ff7575;
    }
  `;

  @property()
  shape!: AnyPointer;

  // DEFAULTED CONFIGS 
  @property({ reflect: true })
  readonly: boolean = false;

  @state({})
  isValid: boolean = false;
  
  @property()
  resourceURI: NamedNode.NamedNode<string> = ns.cfrl.newResource;
  @property({ type: Object })
  resource?: AnyPointer;
  // END DEFAULTED CONFIGS 

  @queryAsync('#body-form')
  formHTML!: ShaperoneForm

  @state()
  isHidden = true;

  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
    return this.shape !== null
  }

  async connectedCallback() {
    super.connectedCallback()
  

    if (!this.resource) {
      this.resource = this.defaultResource();
    }
    validation.setValidator(validate)

    components.pushComponents({ nestedForm })
    renderer.setTemplates(template)

    components.pushComponents({ 
      textFieldEditor, 
      fileInputEditor, 
      textArea, 
      multiSelectEditor, 
      datePickerEditor,
      InstancesSelectEditor
    })

    if (this.readonly) {
      this.makeAllPropertiesReadonly();
    }
    let targetNode = await this.formHTML
    this.formHTML.then(resolv => {
      setTimeout((() => this.isHidden = false).bind(this), 250)
    })

  }

  private makeAllPropertiesReadonly() {

    this.shape
      .out(ns.sh.property)
      .addOut(ns.dash.readOnly, true)
  }
  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    // this.changeCallback()
    this.isValid = false;
    setTimeout((() => this.isValid = false).bind(this), 250)
  }
  // Render the UI as a function of component state
  render() {

      // ?hidden=${this.bodyForm.attributes || true}
    
    const submitButtonHTML = this.readonly ? 
        html`` : 
        html`
        <button
          ?disabled=${! this.isValid}
          class='thinBorderBottom alignItemsVerticalCenter hoover fieldContainer'
          @click="${this.submitCallback}">
          <div>${paperPlane}</div>
          <div>Submit</div>
        </button>`
  
    return html`
      ${alignItemsVerticalCenterCSS}
      ${thinBorderBottomCSS}
      ${hooverCSS}
      ${fieldContainerCSS}  

      <div 
        ?hidden=${this.isHidden}
        style='margin-bottom: 8rem;'>
        <shaperone-form
          id="body-form"
          .shapes=${this.shape}
          .resource=${this.resource}
          @keydown=${this.changeCallback}
          @change=${this.changeCallback}
          @blur=${this.changeCallback}
        >
        </shaperone-form>
        ${submitButtonHTML}
      </div>
    `;
  }

  submitCallback() {
    let dcatTitle = this.resource?.out(ns.dct.title).value
    let schemaName = this.resource?.out(ns.schema.name).value
    const resourceName = dcatTitle || schemaName || "Resource name not computed"
    const resourceURI = this.resource?.value;
    console.log(turtle`${this.resource?.dataset}`.toString());
    
    const event = new CustomEvent('cefriel-form-submitted', {
    
      detail: {
        data: turtle`${this.resource?.dataset}`.toString(),
        name: resourceName,
        uri: resourceURI
      }
    });
    this.dispatchEvent(event);
  }

  private changeCallback() {
    
    let quadsWhereObjectIsEmptyString = this.resource?.dataset.match(null, null, literal(''))
    
    let resourceWithoutEmptyStrings = this.resource?.dataset;
    quadsWhereObjectIsEmptyString.quads.forEach(q => {
      resourceWithoutEmptyStrings.delete(q)
      console.log("deleting");
      
    });

    this.formHTML.then(bf => {
      
      this.isValid = ! bf.state.hasErrors
      setTimeout(
        () => {
          this.formHTML.then(bf => {
            
            return this.isValid = ! bf.state.hasErrors
          }
        )}, 
        200)
    })
    
    
  }

  private defaultResource(): AnyPointer {
    // notice that the resource needs to be of the type expected by the shape to be validated
    const typeExpectedByShape = this.shape.out(ns.sh.targetClass)

    let result = clownface({ dataset: dataset() })
      .namedNode(this.resourceURI.value.toString() + "/" + Math.floor(Math.random() * 999999))
      .addOut(ns.rdf.type, typeExpectedByShape.term || typeExpectedByShape.terms[0])

    return result
  }

}