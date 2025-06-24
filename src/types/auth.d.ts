interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
  plate_number: string
}

interface AuthResponse {
  user: User
  token: string
}

interface User {
  id: number
  name: string
  email: string
  password: string
  plate_number: string
  created_at: string
  updated_at: string
}
