<script setup lang="ts">
  import {ref, onMounted} from 'vue'
  import available_locales from "@/config/supported-locales"

  import { BNavbar, 
           BCollapse, 
           BNavbarNav, 
           BNavItem, 
           BNavItemDropdown, 
           BNavbarBrand} from 'bootstrap-vue-next';
  
  


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
  <BNavbar v-b-color-mode="'dark'" variant="secondary">
    <BNavbarNav>  
      <BNavItem href="https://guziy.blogspot.com/2020/02/arithmetics-practice-app-for-my-son-in.html">
        {{$t('about')}}
      </BNavItem>
    </BNavbarNav>

    <!-- Right aligned nav items -->
    <BNavbarNav>
      <BNavItem href="https://github.com/guziy/arithmetics-practice">
        <font-awesome-icon :icon="['fab', 'github']" />
      </BNavItem>

      <!-- language selection -->
      <BNavItemDropdown right>
        <template #button-content>
          <font-awesome-icon icon="globe" />
        </template>
        <BDropdownItem 
          v-for="(locale_display, locale_key) in available_locales"
          :key="locale_key"
        >
          {{ locale_display }}
        </BDropdownItem>
      </BNavItemDropdown>
    </BNavbarNav>
  </BNavbar>
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
