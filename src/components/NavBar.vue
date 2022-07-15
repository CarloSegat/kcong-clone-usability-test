<template>
 <ul class='navbar'>
  <img 
    style='width: 3rem;'
    src="https://pbs.twimg.com/profile_images/784383890865651712/pG1YAsHt_400x400.jpg">
  <span class='navElement'>Datasets Catalogue</span>
  <span
    style='margin-left: auto; margin-right: 3rem;'
    @click="e => this.$router.push({ 
            name: 'Home'
      })"
  >
    HOME
  </span>
</ul>
</template>

<script lang="js">

export default {
  name: "NavBar"
}

</script>

<style scoped>

.navbar {
  position: fixed;
  display: flex;
  align-items: center;
  top: 0rem;
  left: 0rem;
  background-color: rgb(242, 242, 242);
  width: 100vw;
  padding: 0.5rem;
  font-size: 17px;
}

.navElement {
  font-weight: 400;
  font-size: 18pt;
  margin-left: 1rem;
}

</style>
