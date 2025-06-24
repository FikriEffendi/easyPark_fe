<template>
  <div class="bg-[#B09D9D] w-screen h-screen flex justify-center items-center">
    <div class="space-y-10 min-w-md">
      <div class="text-3xl text-center">Sign In</div>

      <form @submit.prevent="submit" class="space-y-3">
        <div class="space-y-0.5">
          <label for="email" class="block text-lg">email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="bg-[#D8D8D8] rounded-md py-2 px-1 w-full"
            :class="{ 'border-red-500': errors?.email }"
            required
          />
        </div>
        <div class="space-y-0.5">
          <label for="password" class="block text-lg">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="bg-[#D8D8D8] rounded-md py-2 px-1 w-full"
            :class="{ 'border-red-500': errors?.password }"
            required
          />
        </div>
        <div>
          <button
            class="text-white bg-[#ffa62f] w-full rounded-md py-3.5 disabled:opacity-50"
            type="submit"
            :disabled="submitting"
          >
            Login
          </button>
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
