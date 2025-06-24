import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>()
  const token = ref('')

  const getTokenFromLocalStorage = () => {
    token.value = localStorage.getItem('auth_token') ?? ''
  }

  const setUser = (data: AuthResponse) => {
    user.value = data.user
    token.value = data.token
    localStorage.setItem('auth_token', data.token)
  }

  return {
    setUser,
    user,
    token,
    getTokenFromLocalStorage,
  }
})
