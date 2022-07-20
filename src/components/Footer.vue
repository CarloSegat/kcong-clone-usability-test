<template>
 <footer class='footer'>
  <span>2022 — Cefriel</span>
 </footer>
</template>

<script lang="js">

export default {
  name: "Footer"
}

</script>

<style scoped>

.footer {
  position:fixed;
  bottom:0;
  right:0;
  display: flex;
  align-items: center;
  background-color: rgb(242, 242, 242);
  width: 100vw;
  height: 2rem;
  padding: 0.5rem;
  font-size: 12px; 
  place-content: center;
}

.navElement {
  font-weight: 400;
  font-size: 18pt;
  margin-left: 1rem;
}

</style>
