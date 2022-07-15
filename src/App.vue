<template>
  <main>
    <NavBar></NavBar>
    <br>
    <br>
    <router-view></router-view>
  </main>
  <span style="font-size: 3em; color: Tomato;">
      <i class="fas fa-camera"></i>
    </span>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>


<style>
@import './assets/base.css';

#app {
  padding: 2rem;
  font-weight: normal;
}

.navbarbox {
  margin-bottom: 1rem;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
