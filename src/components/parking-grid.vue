<template>
  <div class="bg-[#d9d9d9] p-6 rounded-lg grid grid-cols-5 gap-4 w-full max-w-md">
    <div
      v-for="slot in 10"
      :key="slot"
      class="bg-[#8f5f5c] text-white py-4 text-center rounded-md font-semibold"
    >
      {{ prefix }}{{ slot }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  prefix: {
    type: String,
    required: true,
  },
})
</script>
