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

<style>
html, body, input, button, select, textarea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #0f172a;
}

:deep(input),
:deep(button),
:deep(select),
:deep(textarea) {
  font-family: inherit;
}

main {
  padding: 40px 16px 48px;
}
</style>