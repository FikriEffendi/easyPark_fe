<template>
  <div class="flex flex-col items-center justify-center">
    <riwayat-card :lists="listRiwayat" />
  </div>
</template>

<script setup lang="ts">
import RiwayatCard from '@/components/riwayat-card.vue'
import { useApi } from '@/lib/api'
import { ref } from 'vue'

const api = useApi()
const listRiwayat = ref<History[]>([])

const getData = async () => {
  const response = await api.GET('/api/reservations')
  listRiwayat.value = response.data
  console.log(response)
}

getData()
</script>

<style scoped></style>
