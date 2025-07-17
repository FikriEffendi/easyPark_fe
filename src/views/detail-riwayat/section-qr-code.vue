<template>
  <div class="bg-[#D9D9D9] w-full rounded-xl max-w-2xl py-4 flex justify-center">
    <qrcode-vue :value="qrCode" :size="200" level="H" />
  </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'

defineProps({
  qrCode: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
