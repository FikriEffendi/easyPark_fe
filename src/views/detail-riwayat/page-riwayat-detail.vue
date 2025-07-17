<template>
  <div class="flex flex-col items-center">
    <section-header />
    <section-qr-code v-if="riwayatDetail" :qrCode="riwayatDetail.qr_code" />
    <section-detail-card v-if="riwayatDetail" :user="riwayatDetail.user" />
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/lib/api'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SectionHeader from './section-header.vue'
import SectionDetailCard from './section-detail-card.vue'
import SectionQrCode from './section-qr-code.vue'

const api = useApi()
const route = useRoute()
const riwayatDetail = ref<Reservation>()

const getData = async () => {
  const response = await api.GET<Reservation>(`/api/reservations/${route.params.id}`)
  riwayatDetail.value = response
  console.log(response)
}

getData()
</script>

<style lang="scss" scoped></style>
