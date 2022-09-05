# exmaple-shaperone
SHACL form generator for my master thesis + the mock metadata catalogue for the usability test

For this to work properly you need to first run the django backend.

## Project structure

Everything in `src`.
- assets: icons, css and images
- views: each page in the Vue application is a view, a view is composed of components
- components: Vue components used to build views
- shacl-form-generator: everything related to the form generator. It exposes a custom html element (`semantic-form-gen`), 
  you can see this instanciated in e.g. `AddAsset.vue`

### shacl-form-generator
Shaperone architecture consists in 3 entities: renderer, template and component. Renderers invoke templates which in turn invoke renderers, this chain of responsibility keeps going until an `editor render`invokes a component. Components can be considered as the actual html implmenetations of form elements. Also template can contain html but they act as containers. Renderes on the other hand are purely an abstraction to manage the rendering process. The figure `chain-of-responsability.png` in the root folder shows some details.

- custom components: this folder contains the components I used. They are defined in separate files but exported in `src\shacl-form-generator\customComponents\index.ts`. Some of them are basic and Shaperone already provides them, but I decided to use custom versions to have more freedom in changing the style. Others, e.g. `multiSelect` are not implemented by Shaperone. I made the `fileInput` component just to see if i t was feasible, it save the base64 of a file as the literal value of a triple. I invented the identifier `dash:fileUpload`
beacuse SHACL / DASH don't provide something.
- templates: I mainly modified `object` template with a remove button and `property` with the Add button. `property` template is also where labels are shown.
- shaclFormGenerator.ts is a Lit component instanciating a Shaperone instance and confioguring to use custom components/templates and to do some more stuff like creating a RDF resource if one is not provided.
  
## How to run

```sh
npm install
```
```sh
npm run dev
```

## Tests
Todo


