<template>
  <div class="bg-[#b09d9d] min-h-screen">
    <component-navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import ComponentNavbar from './component-navbar.vue'
</script>

<style scoped></style>
