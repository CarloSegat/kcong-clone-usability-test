# exmaple-shaperone

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```


### separating header & body - maybe with graph literals

You have 2 shapes: 1 for the header and 1 for the body.

<http://id/theThing5692024> 

    ex:headerGraph "<http://id/theThing5692024> 
        <http://purl.org/dc/terms/title> "internalAssetNameId122131212" ;
        <http://purl.org/dc/terms/description> "This is a sw that does x " ;
        <http://purl.org/dc/terms/type> "http://example/software" ."^^rdfl:GraphLiteral ;


    ex:bodyGraph "<http://id/theThing5692024> 
        schema:name "MagicDashboardv2.1.4" ;
        schema:datePublished "2022-06-01"^^xsd:date ."^^rdfl:GraphLiteral 

.

creating new data: easy to have 2 shaperone-forms each one with it's own shape.
onSubmit create the structure above from the cefriel-custom-form component

visualising: if the server returns the same graph-literalled thing it's fine; 
if the server processes
and flatten the structure, returning a normal rdf graph then visualisation is still possible by
merging the headerShape RDF and bodyShape rdf in the cefriel component

editing: if the server returns the same graph-literalled thing it's fine; otherwise
it's hard


### keeping header & body together

This approach is fine but if the server needs to treat differently header/body può essere un problema

<http://id/theThing5692024> 
    <http://purl.org/dc/terms/title> "internalAssetNameId122131212" ;
    <http://purl.org/dc/terms/description> "This is a sw that does x " ;
    <http://purl.org/dc/terms/type> "http://example/software" ;
    schema:name "MagicDashboardv2.1.4" ;
    schema:datePublished "2022-06-01"^^xsd:date .

creating new data: need to merge the 2 shapes and use teh result to feed one single shaperone-form

visualising: assuming the server returns the same structure that was output then we just
need to merge the shapes again and we are done.

editing: just like visualising but with the fields not locked.

### alternative that makes me realise that graph literals may not be necessary

<http://id/theThing5692024> 
    ex:header <http://id/theThing5692024/header> ;

    ex:bodyGraph <http://id/theThing5692024/body> .
   
<http://id/theThing5692024/header>  
    <http://purl.org/dc/terms/title> "internalAssetNameId122131212" ;
    <http://purl.org/dc/terms/description> "This is a sw that does x " ;
    <http://purl.org/dc/terms/type> "http://example/software" .

<http://id/theThing5692024/body> 
    schema:name "MagicDashboardv2.1.4" ;
    schema:datePublished "2022-06-01"^^xsd:date .


creating: can feed 2 different forms. Then combine the results.

visualising & editing: easy as long as the server doesn't flatten the thing