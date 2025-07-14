import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReservationStore = defineStore('reservation', () => {
  const selectedSpotId = ref<number | null>(null)

  const setSelectedSpot = (id: number | null) => {
    selectedSpotId.value = id
  }

  return {
    selectedSpotId,
    setSelectedSpot,
  }
})
