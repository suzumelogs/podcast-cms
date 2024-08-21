import { createPerson } from '@/libs/api/person'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { PersonCreateInputType } from '../type'

export const usePersonCreate = (setError: UseFormSetError<PersonCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof PersonCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createPerson,
    onError: handleMutationError,
  })

  return mutation
}
