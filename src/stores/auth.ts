import router from '@/router'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token') || '')
  const isLoading = ref(false)

  //login
  const login = async (credentials: { email: string; password: string }) => {
    try {
      isLoading.value = true
      const response = await axios.post('api/login', credentials)

      if (response.data.success) {
        token.value = response.data.token
        user.value = response.data.user

        //Simpan token ke localStorage
        localStorage.setItem('auth_token', token.value)

        //Set default header untuk request selanjutnya
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

        //Redirect ke halaman home
        const redirectPath = (router.currentRoute.value.query.redirect as string) || '/'
        router.push(redirectPath)

        return { success: true, message: 'Login berhasil' }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Login gagal',
      }
    } finally {
      isLoading.value = false
    }
  }

  //Register function
  const register = async (userData: {
    name: string
    email: string
    password: string
    password_confirmation: string
    plate_number: string
  }) => {
    try {
      isLoading.value = true
      const response = await axios.post('api/register', userData)

      if (response.data.success) {
        //Auto login setelah register
        return await login({ email: userData.email, password: userData.password })
      }
    } catch (error: any) {
      console.error('Register error:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Registrasi gagal',
      }
    } finally {
      isLoading.value = false
    }
  }

  //Logout function
  const logout = async () => {
    try {
      await axios.post('api/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      //Clear local state
      token.value = ''
      user.value = null
      localStorage.removeItem('auth_token')
      delete axios.defaults.headers.common['Authorization']

      //Redirect ke login
      router.push({ name: 'login' })
    }
  }

  //Check if user is authenticated
  const isAuthenticated = () => {
    return !!token.value
  }

  //Initialiaze auth state
  const initAuth = () => {
    if (token.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }
  }

  return {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
    initAuth,
  }
})
