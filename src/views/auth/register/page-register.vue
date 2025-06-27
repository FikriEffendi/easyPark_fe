<template>
  <div>
    <div class="bg-[#B09D9D] w-screen h-screen flex justify-center items-center">
      <div class="space-y-10 min-w-md">
        <div class="text-3xl text-center">Sign Up</div>
        <form @submit.prevent="submit" class="space-y-3">
          <g-input
            id="name"
            v-model="form.name"
            placeholder="Name"
            type="text"
            label="Name"
            :error="errors?.name"
            required
          />
          <g-input
            id="email"
            v-model="form.email"
            placeholder="Email"
            type="text"
            label="Email"
            :error="errors?.email"
            required
          />
          <g-input
            id="password"
            v-model="form.password"
            placeholder="Password"
            type="text"
            label="Password"
            :error="errors?.password"
            required
          />
          <g-input
            id="password_confirmation"
            v-model="form.password_confirmation"
            placeholder="Confirm Password"
            type="text"
            label="Confirm Password"
            :error="errors?.password_confirmation"
            required
          />
          <g-input
            id="plate_number"
            v-model="form.plate_number"
            placeholder="Plate Number"
            type="text"
            label="Plate Number"
            :error="errors?.plate_number"
            required
          />
          <g-button type="submit" :loading="submitting">Sign Up</g-button>
          <div class="text-center">
            Already have an account?
            <router-link to="/auth/login" class="text-white hover:text-zinc-100">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import GInput from '@/components/g-input.vue'
import GButton from '@/components/g-button.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useAuthRegister } from '@/models/Auth'

const authStore = useAuthStore()
const router = useRouter()

const { form, submitting, errors, submit: register } = useAuthRegister()

const submit = async () => {
  const response = await register()
  if (response) {
    authStore.setUser(response)
    router.replace({ name: 'login' })
  }
}
</script>

<style lang="scss" scoped></style>
