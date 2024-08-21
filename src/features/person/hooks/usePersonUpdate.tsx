import { updatePerson } from '@/libs/api/person'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { PersonUpdateInputType } from '../type'

export const usePersonUpdate = (setError: UseFormSetError<PersonUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof PersonUpdateInputType, { message })
        }
      })
    }
  }
  const mutation = useMutation({
    mutationFn: updatePerson,
    onError: handleMutationError,
  })

  return mutation
}
