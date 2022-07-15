<template>

  <main>
    <NavBar></NavBar>
    <div
      style='margin-block-start: 4rem;'>
      <router-view>
      </router-view>
      <Footer/>
    </div>
  </main>

  <span style="font-size: 3em; color: Tomato;">
      <i class="fas fa-camera"></i>
    </span>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    NavBar,
    Footer
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
