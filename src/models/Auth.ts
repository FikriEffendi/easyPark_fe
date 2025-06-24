import { useApi } from '@/lib/api'
import router from '@/router'
import axios from 'axios'
import { reactive, ref } from 'vue'

export function useAuthLogin() {
  const api = useApi()
  const submitting = ref(false)
  const errors = ref<FormError>({})
  const form = reactive({
    email: '',
    password: '',
  })

  const submit = async () => {
    submitting.value = true
    try {
      const response = await api.POST<AuthResponse>('api/login', form)
      // console.log(response)
      return response
    } catch (error) {
      errors.value = api.formErrors(error)
    } finally {
      submitting.value = false
    }
  }

  return {
    form,
    submitting,
    errors,
    submit,
  }
}

// export function useAuthModel() {
//   //login function

//   //Register function
//   const register = async (userData: RegisterData) => {
//     submitting.value = true
//     try {
//       const response = await api.POST<ApiResponse<AuthResponse>>('api/register', userData)

//       if (response.data && response.data.data) {
//         //Auto login setelah register
//         return await login({ email: userData.email, password: userData.password })
//       }
//     } catch (error: any) {
//       console.error('Register error:', error)
//       return {
//         success: false,
//         messages:
//           error.response?.data?.meta?.message || error.response?.data?.message || 'Register gagal',
//         errors: error.response?.data?.errors,
//       }
//     } finally {
//       submitting.value = false
//     }
//   }

//   //Logout function
//   const logout = async () => {
//     try {
//       await api.POST('api/logout')
//     } catch (error) {
//       console.error('Logout error:', error)
//     } finally {
//       //Clear local state
//       token.value = ''
//       user.value = null
//       localStorage.removeItem('auth_token')

//       //Redirect ke login
//       router.push({ name: 'login' })
//     }
//   }

//   const isAuthenticated = () => {
//     return !!token.value
//   }

//   //Initialiaze auth state
//   const initAuth = () => {
//     if (token.value) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
//     }
//   }

//   return {
//     login,
//     register,
//     logout,
//     isAuthenticated,
//     initAuth,
//     token,
//     user,
//     isLoading,
//   }
// }
