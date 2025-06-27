<template>
  <button
    :disabled="disabled"
    :type="type"
    class="text-white bg-[#ffa62f] w-full rounded-md py-3.5 disabled:opacity-50"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped></style>
