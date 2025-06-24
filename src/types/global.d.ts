interface ApiResponse<T> {
  meta: {
    code: number
    status: string
    messages: string
    // validations:
    response_date: string
  }
  data: T
}

interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

interface FormError {
  [k: string]: string[]
}
