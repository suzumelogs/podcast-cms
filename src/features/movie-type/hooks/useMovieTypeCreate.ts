import { createMovieType } from '@/libs/api/movie-type'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { MovieTypeCreateInputType } from '../type'

export const useMovieTypeCreate = (setError: UseFormSetError<MovieTypeCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof MovieTypeCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createMovieType,
    onError: handleMutationError,
  })

  return mutation
}
