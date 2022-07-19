import { html } from 'lit-element';

export const thinBorderBottomCSS = html`
<style>
  .thinBorderBottom {
      border: none;
      outline: none;
      border-bottom: thin;
      border-bottom-style: solid;
    }
</style>
`;

export const noBordersCSS = html`
<style>
  .noBorders {
      border: none;
      outline: none;
      background-color: transparent;
    }
</style>
`;

export const alignItemsVerticalCenterCSS = html`
<style>
  .alignItemsVerticalCenter {
    display: flex; 
    align-items: center; 
    gap: 1rem;
    padding: 0.5rem; 
    background-color: transparent;
  }
</style>
`;

export const hooverCSS = html`
<style>
  .hoover:hover {
    background-color: var(--vt-c-text-dark-2);
  }
</style>
`;

export const fieldContainerCSS = html`
<style> 

.fieldContainer {
    width: var(--field-width);
    margin: 1.5rem 0rem;
    font-size: var(--font-size);
  }

.nested-container .fieldContainer {
    width: var(--field-width);
    margin: 0.5rem 0rem;
    font-size: var(--font-size);
  }
</style>


`;

export const fieldCSS = html`
<style>
  .field {
    width: var(--field-width);
    font-size: var(--font-size);
  }
  input:disabled {
    cursor: default;
    background-color: transparent;
    opacity: 0.8;
  }
</style>
`;