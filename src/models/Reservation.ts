import { useApi } from '@/lib/api'
import { ref } from 'vue'

export function useReservationPost() {
  const api = useApi()
  const submitting = ref(false)
  const errors = ref<FormError>({})
  const reservation = ref<Reservation | null>(null)

  const createReservation = async (spotId: number) => {
    submitting.value = true
    try {
      const response = await api.POST<Reservation>('api/reservations', { spot_id: spotId })
      reservation.value = response
      return response
    } catch (error) {
      errors.value = api.formErrors(error)
    } finally {
      submitting.value = false
    }
  }

  return {
    submitting,
    errors,
    reservation,
    createReservation,
  }
}
