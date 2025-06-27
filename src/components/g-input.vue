<template>
  <div class="space-y-0.5">
    <label :for="id" class="block text-lg">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="bg-[#D8D8D8] rounded-md py-2 px-1 w-full"
      :class="{ 'border-red-500': hasError }"
    />
    <span v-if="hasError" class="text-red-500 text-sm">{{ error[0] }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel({
  type: String,
  default: '',
})

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [String, Array],
    default: '',
  },
})

const hasError = computed(() => {
  if (Array.isArray(props.error)) {
    console.log(props.error)
    // return props.error.length
  }
  return !!props.error
})
</script>

<style lang="scss" scoped></style>
