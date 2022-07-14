<template>
  <main>
    <router-view></router-view>
  </main>
  <span style="font-size: 3em; color: Tomato;">
      <i class="fas fa-camera"></i>
    </span>
</template>

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
