<template>
  <div class="space-y-2">
    <template v-for="item in lists" :key="item.id">
      <router-link
        :to="{ name: 'riwayat-detail', params: { id: item.id } }"
        class="bg-[#D9D9D9] hover:bg-[#E8E8E8] min-w-2xl py-14 rounded-xl flex justify-around"
      >
        <div class="text-center">
          <div class="font-bold text-2xl">Tempat parkir</div>

          <div class="text-xl">{{ item.spot.spot_name }}</div>
        </div>
        <div class="text-center">
          <div class="font-bold text-2xl">status</div>
          <div class="text-xl">{{ item.reservation_status }}</div>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps({
  lists: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
