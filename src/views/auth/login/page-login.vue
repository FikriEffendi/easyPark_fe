<template>
  <div class="bg-[#B09D9D] w-screen h-screen flex justify-center items-center">
    <div class="space-y-10 min-w-md">
      <div class="text-3xl text-center">Sign In</div>

      <form @submit.prevent="submit" class="space-y-3">
        <div class="space-y-0.5">
          <g-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
            :error="errors?.email"
            label="Email"
          />
        </div>
        <div class="space-y-0.5">
          <g-input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Password"
            label="Password"
            :error="errors?.password"
            required
          />
        </div>
        <div>
          <g-button type="submit" :disabled="submitting">login</g-button>
        </div>
        <div class="text-center">
          Don't have an account?
          <router-link to="/auth/register" class="text-white hover:text-zinc-100"
            >Create Account</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import GInput from '@/components/g-input.vue'
import GButton from '@/components/g-button.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useAuthLogin } from '@/models/Auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const { submitting, form, errors, submit: login } = useAuthLogin()
const submit = async () => {
  const response = await login()
  if (response) {
    authStore.setUser(response)
    router.replace({ name: 'home' })
  }
}
</script>

<style scoped></style>
