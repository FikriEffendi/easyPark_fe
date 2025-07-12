<template>
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
    <parking-grid :spots="filteredSpots" />
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import ParkingGrid from '@/components/parking-grid.vue'
import { useApi } from '@/lib/api'

const api = useApi()
const selectedFloor = ref('A')
const parkingSpots = ref([])

const filteredSpots = computed(() => {
  return parkingSpots.value.filter((spot) => spot.spot_name.startsWith(selectedFloor.value))
})

const getData = async () => {
  const response = await api.GET('api/parking-spots')
  parkingSpots.value = response.data || []
  console.log(response)
}

const floors = [
  { value: 'A', label: 'Lt 1' },
  { value: 'B', label: 'Lt 2' },
  { value: 'C', label: 'Lt 3' },
]

onMounted(() => {
  getData()
})
</script>

<style scoped></style>
