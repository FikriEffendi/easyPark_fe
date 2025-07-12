<template>
  <div class="bg-[#d9d9d9] p-6 rounded-lg grid grid-cols-5 gap-4 w-full max-w-md">
    <div
      v-for="spot in spots"
      :key="spot.id"
      class="bg-[#8f5f5c] text-white py-4 text-center rounded-md font-semibold"
    >
      {{ spot.spot_name }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  spots: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>
