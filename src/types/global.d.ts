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

interface ParkingSpot {
  id: number
  spot_name: string
  is_occupied: boolean
}

interface Reservation {
  id: number
  status: string
  user: User
  spot: ParkingSpot
  qr_code: string
  expired_at: string
  billing: any
}

interface History {
  reservation_status: string
  spot: ParkingSpot
}
