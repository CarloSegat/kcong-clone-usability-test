<template>
  <div class="assetContainerSingle">
    <div style="padding: 16px; max-height: 5rem;">
    
      <h3
      >{{this.name}}</h3>
      <div class="tooltipContainer">
        <div class="tooltip">URI: {{this.uri}}</div>
        <h4 class="oneLineHideOverflow">{{this.uri}}</h4>
      </div>
    </div>
    <hr class='divider'>
    <div style="max-width: inherit; max-height: 5rem; display: flex; align-items: center; overflow: hidden;">
      <img 
        style="width:4.5rem; opacity: 0.8; right: 0.2rem; top: 0.52rem; object-fit: cover"
        src="../assets/box.webp">
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: "AssetInstanceComponent",
  props: {
    name: "",
    uri: "",
  }
}

</script>

<style scoped>

  .assetContainerSingle {
    width: 10rem;
    max-width: 12rem;
    max-height: 10rem;
    border: thin solid rgba(0, 0, 0, 0.12);
    background-color: var(--vt-c-white-mute);
    border-radius: 3%;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  }

  .divider {
      border-color: rgba(0, 0, 0, 0.12);
  }

  .oneLineHideOverflow {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    font-size: 10pt;
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
