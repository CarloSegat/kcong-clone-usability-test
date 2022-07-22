<template>
  <div class="addAssetContainer">
    <div style="padding: 16px; max-height: 5rem;">
      <h3>
        {{this.name}}
      </h3>
      <div class="tooltipContainer">
        <div class="tooltip">URI: {{this.uri}}</div>
        <h4 
          style="font-size: 10pt;" 
          class="oneLineHideOverflow">{{this.uri}}
        </h4>
      </div>
    </div>
    
    <div style="max-width: inherit; min-height: 5rem; max-height: 5rem; display: flex; align-items: center; justify-content: center;">
      <div style="font-size:5rem;">+</div>
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: "AddAssetComponent",
  props: {
    name: "",
    uri: "",
  }
}

</script>

<style scoped>

  .addAssetContainer {
    cursor: pointer;
    width: 10rem;
    max-width: 12rem;
    max-height: 10rem;
    border: thick dashed rgba(0, 0, 0, 0.12);
    background-color: var(--vt-c-white-mute);
    border-radius: 3%;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  }

  .divider {
      border-color: rgba(0, 0, 0, 0.12);
  }

  .tooltipContainer:hover .tooltip {
    visibility: visible !important;
  }

  .tooltip {
    position: absolute;
    bottom:1rem;
    width: fit-content;
    /* bottom: 2.5rem; */
    background-color: var(--vt-c-white);
    padding: 0.1rem 0.8rem;
    border-radius: 5%;
    overflow: visible !important;
    z-index: 500;
    white-space: nowrap;
    visibility: hidden;
    font-size: 10pt;
  }

</style>
