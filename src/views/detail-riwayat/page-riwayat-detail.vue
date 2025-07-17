<template>
  <div>Halo</div>
</template>

<script setup lang="ts">
import { useApi } from '@/lib/api'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const api = useApi()
const route = useRoute()
const riwayatDetail = ref<Reservation>()

const getData = async () => {
  const response = await api.GET<Reservation>(`/api/reservations/${route.params.id}`)
  riwayatDetail.value = response.value
  console.log(response)
}

getData()
</script>

<style lang="scss" scoped></style>
