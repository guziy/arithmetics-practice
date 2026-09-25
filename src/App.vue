<script setup lang="ts">


import { ref } from 'vue'

import {
  MAX_NUM_EQUATIONS, 
  MIN_NUM_EQUATIONS,
  num_upper_limit_list,
  all_operations_text_labels,
  all_operations_symbols
} from './util/constants.js'
import EquationBlock from './components/EquationBlock.vue';
import TopMenu from './components/TopMenu.vue';
import OptionsBlock from './components/OptionsBlock.vue';


</script>



<template>
  <v-app>
    <TopMenu />
    <v-main>
      <OptionsBlock />
    </v-main>
  </v-app>

</template>


<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-width: 600px;
  }
  /* Define an animation behavior */
  @keyframes spinner {
    to { transform: rotate(360deg); }
  }
  /* This is the class name given by the Font Awesome component when icon contains 'spinner' */
  .fa-spinner {
    /* Apply 'spinner' keyframes looping once every second (1s)  */
    animation: spinner 1.5s linear infinite;
  }


  li.current-equation{
    border-bottom: none;
  }
</style>
