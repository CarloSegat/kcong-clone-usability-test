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


@customElement('shaperone-form-gen')
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
  headerShape?: any;

  @property()
  bodyShape!: AnyPointer;

  // DEFAULTED CONFIGS 
  @property({ reflect: true })
  readonly: boolean = false;
  
  @property()
  propConflictStrategy: string = "keep-header"; // ignore
  @property()
  resourceURI: NamedNode.NamedNode<string> = ns.cfrl.newResource;
  @property({ type: Object })
  resource?: AnyPointer;
  // END DEFAULTED CONFIGS 

  @queryAsync('#header-form')
  headerForm!: ShaperoneForm

  @queryAsync('#body-form')
  bodyForm!: ShaperoneForm

  @state()
  isHidden = true;

  protected shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
    return this.bodyShape !== null
  }

  async connectedCallback() {
    super.connectedCallback()
  
    console.log('connected')

    if (!this.resource) {
      this.resource = this.defaultResource();
    }
    validation.setValidator(validate)

    components.pushComponents({ nestedForm })
    renderer.setTemplates(template)

    console.log("🚀 . SemanticForm . connectedCallback . renderer.ready()", renderer.ready())

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
    // this.detectPropConflict();
    let targetNode = await this.bodyForm
    console.log("🚀 . SemanticForm . connectedCallback . targetNode.attributes[0].ownerElement.hasUpdated", targetNode.attributes[0].ownerElement.hasUpdated)
    this.bodyForm.then(resolv => {
      console.log("okokokok resolved");
      setTimeout((() => this.isHidden = false).bind(this), 250)
      
    })

  }

  private makeAllPropertiesReadonly() {
    // console.log("makeAllPropertiesReadonly");

    this.bodyShape
      .out(ns.sh.property)
      .addOut(ns.dash.readOnly, true)

    this.headerShape?.out(ns.sh.property)
      .addOut(ns.dash.readOnly, true)
  }
  // Render the UI as a function of component state
  render() {
    console.log("🚀 . SemanticForm . connectedCallback . renderer.ready()", renderer.ready())
    console.log("bodyForm ", this.bodyForm);
    
    let headerHTML = this.headerShape !== null ?
      html`<shaperone-form
      .id=${'header-form'}
      .shapes=${this.headerShape}
      .resource=${this.resource}
      @changed=${this.changeCallback}
      >
    </shaperone-form>`
      : html``

      // ?hidden=${this.bodyForm.attributes || true}
    console.log("! this.bodyForm?.attributes || ! this.bodyForm?.attributes[0].ownerElement.hasUpdated");
    console.log(! this.bodyForm?.attributes || ! this.bodyForm?.attributes[0].ownerElement.hasUpdated);
    
    const submitButtonHTML = this.readonly ? 
        html`` : 
        html`
        <button
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

      ${headerHTML}

      <div 
        ?hidden=${this.isHidden}
        style='margin-bottom: 8rem;'>
        <shaperone-form
          id="body-form"
          .shapes=${this.bodyShape}
          .resource=${this.resource}
          @changed=${this.changeCallback}
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

  private printRDF(temp, ...args: String[]) {
    console.log(args[0], turtle`${temp?.dataset}`.toString());
  }

  private detectPropConflict() {

    if (this.propConflictStrategy == 'ignore') return;
    if (!this.headerShape) return;


    if (this.propConflictStrategy == 'keep-header') {
      // simply remove all the properties present in the header from the body
      this.headerShape = this.headerShape
        .deleteOut(ns.sh.property, this.bodyShape.out(ns.sh.property))
    } else {
      console.error("Invalid propConflictStrategy")
    }
  }

  private changeCallback() {
    // console.log("this.headerForm?.isValid ", this.headerForm?.isValid);

    let quadsWhereObjectIsEmptyString = this.resource?.dataset.match(null, null, literal(''))
    let resourceWithoutEmptyStrings = this.resource?.dataset;
    quadsWhereObjectIsEmptyString.quads.forEach(q => {
      resourceWithoutEmptyStrings.delete(q)
    });
  }

  private defaultResource(): AnyPointer {
    // notice that the resource needs to be of both types expected by the
    // header and body sape for validation to target it correctly
    const typeExpectedByBody = this.bodyShape.out(ns.sh.targetClass)
    const typeExpectedByHeader = this.headerShape?.out(ns.sh.targetClass)

    let result = clownface({ dataset: dataset() })
      .namedNode(this.resourceURI.value.toString() + "/" + Math.floor(Math.random() * 999999))
      .addOut(ns.rdf.type, typeExpectedByBody.term || typeExpectedByBody.terms[0])

    if (typeExpectedByHeader) {
      result.addOut(ns.rdf.type, typeExpectedByBody);
    }
    return result
  }

}