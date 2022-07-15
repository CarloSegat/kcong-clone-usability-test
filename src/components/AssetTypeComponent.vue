<template>
  <div class="assetContainerSingle">
    <div style="padding: 16px;">
      <h3
        style="color: white;"
      >{{this.name}}</h3>
    </div>
    <hr class='divider'>
    <div style="padding: 8px; max-width: 10rem; display: flex; align-items: center; overflow: hidden;">
      <img 
        style="width:11rem; opacity: 0.8; right: 3.75rem; bottom: 3rem"
        src="../assets/datalogo.webp">
    </div>
  </div>
</template>

<script lang="js">

export default {
  name: "AssetTypeComponent",
  props: {
    name: ""
  }
}

</script>

<style scoped>

  .assetContainerSingle {
    width: 10rem;
    max-width: 12rem;
    max-height: 10rem;
    border: thin solid rgba(0, 0, 0, 0.12);
    background-color: rgb(49, 39, 119);
    overflow: hidden;
    border-radius: 3%;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  }

  .divider {
      border-color: rgba(0, 0, 0, 0.12);
  }

</style>
