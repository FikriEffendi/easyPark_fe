<template>
  <div class="bg-[#D9D9D9] w-full rounded-xl max-w-2xl">
    {{ user.name }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
