<script setup lang="ts">
  import {onMounted} from 'vue'
  import {supportedLocales} from "../config/supported-locales"
  import { useI18n } from 'vue-i18n';

  import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
  import 'element-plus/es/components/menu/style/css' 
  
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
  <el-menu
    mode="horizontal"
    background-color="#6c757d"
    text-color="#fff"
    active-text-color="#fff"
    :ellipsis="false"
    class="custom-navbar"
  >
    <!-- Left Aligned Items -->
    <el-menu-item index="about">
      <a href="https://guziy.blogspot.com/2020/02/arithmetics-practice-app-for-my-son-in.html" target="_blank">
        {{ t('about') }}
      </a>
    </el-menu-item>

    <!-- Flex spacer to push remaining items to the right -->
    <div class="flex-grow" />

    <!-- Right Aligned Items -->
    <el-menu-item index="github">
      <a href="https://github.com/guziy/arithmetics-practice" target="_blank">
        <font-awesome-icon :icon="['fab', 'github']" />
      </a>
    </el-menu-item>

    <!-- Language selection -->
    <el-sub-menu index="language">
      <template #title>
        <font-awesome-icon icon="globe" />
      </template>
      <el-menu-item 
        v-for="(locale_display, locale_key) in supportedLocales"
        :key="locale_key" 
        :index="`lang-${locale_key}`"
        @click="onChangeLanguage(locale_key)"
      >
        {{ locale_display }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>


<style>
  
</style>
