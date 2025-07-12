<template>
  <div class="bg-[#b99c99] min-h-screen">
    <component-navbar />
    <div class="container pt-20">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import ComponentNavbar from './component-navbar.vue'
</script>

<style scoped></style>
