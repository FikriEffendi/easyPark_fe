<template>
  <div class="min-h-screen bg-[#b99c99] text-white">
    <header class="bg-[#D9D9D9] py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-black">easyPark</h1>
      <div class="w-8 h-8 bg-black rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 18a8 8 0 1116 0H2z" />
        </svg>
      </div>
    </header>

    <main class="flex flex-col items-center gap-6 py-12 px-4">
      <h2 class="text-xl font-semibold">Parking Slots</h2>

      <!-- Dropdown -->
      <select
        v-model="selectedFloor"
        class="bg-[#8f5f5c] text-white px-4 py-2 rounded-md cursor-pointer text-center w-32"
      >
        <option v-for="floor in floors" :key="floor.value" :value="floor.value">
          {{ floor.label }}
        </option>
      </select>

      <!-- Grid Slot -->
      <parking-grid :prefix="selectedFloor" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ParkingGrid from '@/components/parking-grid.vue'

const selectedFloor = ref('B') // default ke Lt 2
const floors = [
  { value: 'B', label: 'Lt 2' },
  { value: 'C', label: 'Lt 3' },
]
</script>

<style scoped></style>
