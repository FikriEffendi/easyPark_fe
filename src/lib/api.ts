import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import axios from 'axios'

export function useApi() {
  const config = {
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 30_000, //30s
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  const REQUEST = async <T>(conf: AxiosRequestConfig): Promise<T> => {
    try {
      //Add auth token if available
      const token = localStorage.getItem('auth_token')
      if (token) {
        conf.headers = {
          ...conf.headers,
          Authorization: `Bearer ${token}`,
        }
      }

      const response = await axios.request<T>({ ...config, ...conf })
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      handleErrors(error)
      return Promise.reject(error)
    }
  }

  const GET = async <T>(url: string, params?: object) => {
    return await REQUEST<T>({
      method: 'get',
      url,
      params,
    })
  }

  const POST = async <T>(url: string, data?: object) => {
    return await REQUEST<T>({
      method: 'post',
      url,
      data,
    })
  }

  const PUT = async <T>(url: string, data?: object) => {
    return await REQUEST<T>({
      method: 'put',
      url,
      data,
    })
  }

  const DELETE = async <T>(url: string) => {
    return await REQUEST<T>({
      method: 'delete',
      url,
    })
  }

  const onError = {
    // unauthorized: () => {
    //   const shouldRedirectToHome = () => {
    //     // route where authenticated user should not be able to access
    //     return ['login', 'forget password', 'forbidden'].includes(route.name as string)
    //   }
    //   if (!shouldRedirectToHome()) {
    //     const path = route.fullPath.substring(1)
    //     const query = path ? { r: path } : undefined
    //     router.replace({ name: 'login', query })
    //   }
    //   // throw new UnauthenticatedException()
    // },
    // maintenance: () => {
    //   page.setMaintenance()
    // },
    // forbidden: () => {
    //   page.showForbiddenError()
    // },
    // notFound: () => {
    //   page.showNotFoundError()
    // },
    validationFailed: (errors: FormError) => {
      // toast.add('Terdapat kesalahan pada data yang dikirim')
      // setTimeout(() => {
      //   const errorMessage = document.querySelector('.error-message')
      //   errorMessage?.scrollIntoView({ behavior: 'smooth' })
      // }, 100)
      throw new ValidationErrorException(errors)
    },
    // tooManyRequest: () => {
    //   toast.add('Terlalu banyak melakukan request, tunggu beberapa menit sebelum mencoba kembali')
    // },
    // internalServerError: () => {
    //   toast.add('Error pada sisi server, akan segera kami perbaiki')
    // },
    // networkError: () => {
    //   toast.add('Tidak terhubung dengan internet')
    // },
  }

  const handleErrors = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      /**
       * Not axios error
       * Something happened in setting up the request that triggered an Error
       */
      console.error('[NotAxiosError]', error)
      return
    }

    if (error.response) {
      /**
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      switch (error.response.status) {
        // case 401:
        //   onError.unauthorized()
        //   break
        // case 403:
        //   onError.forbidden()
        //   break
        // case 404:
        //   onError.notFound()
        //   break
        case 422:
          onError.validationFailed(error.response.data.errors)
          break
        // case 429:
        //   onError.tooManyRequest()
        //   break
        // case 500:
        //   onError.internalServerError()
        //   break
        // case 503:
        //   onError.maintenance()
        //   break
        default:
          break
      }
      // if (error.message === 'Network Error') {
      //   onError.networkError()
      // }
      console.error('[Axios error]', error)
      return 'AxiosError'
    }
  }
  const formErrors = (error: unknown): FormError => {
    if (error instanceof ValidationErrorException) {
      return error.getErrors()
    }
    return {}
  }

  return {
    GET,
    POST,
    PUT,
    DELETE,
    formErrors,
  }
}

export class ValidationErrorException extends Error {
  constructor(private errors: FormError) {
    super()
    this.name = 'ValidationErrorException'
  }
  getErrors() {
    return this.errors
  }
}
