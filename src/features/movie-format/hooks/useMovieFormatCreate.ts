import { createMovieFormat } from '@/libs/api/movie-format'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { MovieFormatCreateInputType } from '../type'

export const useMovieFormatCreate = (setError: UseFormSetError<MovieFormatCreateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof MovieFormatCreateInputType, { message })
        }
      })
    }
  }

  const mutation = useMutation({
    mutationFn: createMovieFormat,
    onError: handleMutationError,
  })

  return mutation
}
