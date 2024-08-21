import { createMovie } from '@/libs/api/movie'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { MovieCreateInputType } from '../type'

export const useMovieCreate = (setError: UseFormSetError<MovieCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof MovieCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createMovie,
    onError: handleMutationError,
  })

  return mutation
}
