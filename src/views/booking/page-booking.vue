<template>
  <router-link to="/" class="py-2 px-4 bg-amber-400 rounded-xl">Kembali</router-link>
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

    <!-- Reservation Button -->
    <g-button
      @click="createReservation"
      class="w-full max-w-md"
      type="button"
      :disabled="submitting || !selectedSpotId || reservationSuccess"
      >{{ submitting ? 'Memproses' : 'Pesan Tempat Parkir' }}</g-button
    >

    <!-- Success message -->
    <div
      v-if="reservationSuccess"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-full max-w-md mt-4"
    >
      <p>Reservasi berhasil! Tempat parkir telah dipesan.</p>
    </div>

    <!-- Error message -->
    <div
      v-if="Object.keys(errors).length > 0"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full max-w-md mt-4"
    >
      <p>Terjadi kesalahan saat memesan tempat parkir</p>
      <ul class="list-disc pl-5">
        <li v-for="(error, key) in errors" :key="key">{{ error[0] }}</li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ParkingGrid from '@/components/parking-grid.vue'
import { useApi } from '@/lib/api'
import { useReservationStore } from '@/stores/reservation'
import { useReservationPost } from '@/models/Reservation'
import GButton from '@/components/g-button.vue'

const api = useApi()
const store = useReservationStore()
const { submitting, errors, reservation, createReservation: create } = useReservationPost()

const selectedFloor = ref('A')
const parkingSpots = ref<ParkingSpot[]>([])
const reservationSuccess = ref(false)

const filteredSpots = computed(() => {
  return parkingSpots.value.filter((spot) => spot.spot_name.startsWith(selectedFloor.value))
})

const selectedSpotId = computed(() => {
  return store.selectedSpotId
})

const getData = async () => {
  const response = await api.GET('api/parking-spots')
  parkingSpots.value = response.data || []
  console.log(response)
}

const createReservation = async () => {
  if (!selectedSpotId.value) return

  try {
    const result = await create(selectedSpotId.value)
    if (result) {
      reservationSuccess.value = true
      const spotIndex = parkingSpots.value.findIndex((spot) => spot.id === selectedSpotId.value)
      if (!spotIndex) {
        parkingSpots.value[spotIndex].is_occupied = true
      }
      store.setSelectedSpot(null)
    }
  } catch (error) {
    console.log(error)
  }
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
