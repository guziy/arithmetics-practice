<script setup lang="ts">
import TopMenu from './components/TopMenu.vue';
import OptionsBlock from './components/OptionsBlock.vue';
</script>

<template>
  <div class="app">
    <TopMenu />
    <main>
      <OptionsBlock />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #16181d;
}

main {
  padding: 40px 16px 48px;
}
</style>