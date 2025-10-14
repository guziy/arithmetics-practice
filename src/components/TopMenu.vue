<script setup lang="ts">
  import {onMounted} from 'vue'
  import {supportedLocales} from "../config/supported-locales"
  import { useI18n } from 'vue-i18n';

  import { BNavbar, 
           BNavbarNav, 
           BNavItem, 
           BNavItemDropdown, 
  } from 'bootstrap-vue-next';
  
  
  const {t, locale} = useI18n();

  const onChangeLanguage = (locale_key: string) => {
    //console.log(locale_key, locale)
    if (locale.value === locale_key){
      return;
    }
    // console.log(locale_key);
    locale.value = locale_key;
  }


  // lifecycle hooks
  onMounted(() => {
    console.log("menublock mounted")
  })


</script>

<template>
  <BNavbar 
    v-b-color-mode="'dark'" 
    variant="secondary"
  >
    <BNavbarNav>  
      <BNavItem href="https://guziy.blogspot.com/2020/02/arithmetics-practice-app-for-my-son-in.html">
        {{ t('about') }}
      </BNavItem>
    </BNavbarNav>

    <!-- Right aligned nav items -->
    <BNavbarNav>
      <BNavItem href="https://github.com/guziy/arithmetics-practice">
        <font-awesome-icon :icon="['fab', 'github']" />
      </BNavItem>

      <!-- language selection -->
      <BNavItemDropdown 
        right 
        @change="onChangeLanguage($event)"
      >
        <template #button-content>
          <font-awesome-icon icon="globe" />
        </template>
        <BDropdownItem 
          v-for="(locale_display, locale_key) in supportedLocales"
          :key="locale_key" 
          @click="onChangeLanguage(locale_key)"
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
