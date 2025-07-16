<template>
  <div class="w-full max-w-2xl py-14">
    <template v-for="item in lists" :key="item.id">
      <div class="bg-[#D9D9D9] rounded-xl">{{ item.spot.spot_name }}</div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  lists: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
