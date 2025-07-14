<template>
  <div class="bg-[#d9d9d9] p-6 rounded-lg grid grid-cols-5 gap-4 w-full max-w-md">
    <div
      v-for="spot in spots"
      :key="spot.id"
      :class="[
        'py-4 text-center rounded-md font-semibold cursor-pointer transition-colors',
        {
          'bg-[#8f5f5c] text-white': !spot.is_occupied && spot.id !== selectedSpotId,
          'bg-gray-400 text-gray-700': spot.is_occupied,
          'bg-amber-300 text-black': spot.id === store.selectedSpotId,
        },
      ]"
      @click="selectedSpot(spot)"
    >
      {{ spot.spot_name }}
    </div>
  </div>
</template>

<script setup>
import { useReservationStore } from '@/stores/reservation'

defineProps({
  spots: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const store = useReservationStore()

const selectedSpot = (spot) => {
  if (!spot.is_occupied) {
    if (store.selectedSpotId === spot.id) {
      store.setSelectedSpot(null)
    } else {
      store.setSelectedSpot(spot.id)
    }
  }
}
</script>
