import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useFormStore = defineStore('form', () => {
  const formData = reactive({})
  const errors = reactive({})

  const setFieldValue = (fieldName: string, value: string) => {
    formData[fieldName] = value
  }

  const getFieldValue = (fieldName: string) => {
    return formData[fieldName] || ''
  }

  const setFieldError = (fieldName: string, hasError: boolean) => {
    return (errors[fieldName] = hasError)
  }

  const getFieldError = (fieldName: string) => {
    return errors[fieldName]
  }

  const resetForm = () => {
    Object.keys(formData).forEach((key) => {
      delete formData[key]
    })
    Object.keys(errors).forEach((key) => {
      delete errors[key]
    })
  }

  return {
    formData,
    errors,
    setFieldValue,
    getFieldValue,
    setFieldError,
    getFieldError,
    resetForm,
  }
})
