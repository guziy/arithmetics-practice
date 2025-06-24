<script setup lang="ts">
  import {ref, onMounted} from 'vue'
  import available_locales from "@/config/supported-locales"

  
  function on_change_language(selected_language){
    if (this.$i18n.locale === selected_language){
      return;
    }
    console.log(selected_language);
    this.$i18n.locale = selected_language;
  }


  // lifecycle hooks
  onMounted(() => {
    console.log("menublock mounted")
  })


</script>

<template>
  
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  </nav> -->

  <b-navbar type="dark" variant="dark">
    
    <b-navbar-nav>
      <b-nav-item href="https://guziy.blogspot.com/2020/02/arithmetics-practice-app-for-my-son-in.html">
        {{$t('about')}}
      </b-nav-item>
    </b-navbar-nav>
    
    <!-- language selection -->

    <b-navbar-nav class="ml-auto">
      <b-nav-item href="https://github.com/guziy/arithmetics-practice">
        <font-awesome-icon :icon="['fab', 'github']" />
      </b-nav-item>

      <b-nav-item-dropdown right id="language-bar">            
        <template #button-content>
          <font-awesome-icon icon="globe" />
        </template>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-navbar>
  
</template>



<style>
  #language-bar{
    color: white;
    background-color: black;
  }


  #language-bar a.current-language {
    background-color: grey;
  }

  #language-bar .btn {
    color: white;
    background-color: black;
    border-color: white;
  }

</style>
