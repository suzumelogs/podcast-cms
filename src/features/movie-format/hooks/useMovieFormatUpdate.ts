import { updateMovieFormat } from '@/libs/api/movie-format'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { MovieFormatUpdateInputType } from '../type'

export const useMovieFormatUpdate = (setError: UseFormSetError<MovieFormatUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof MovieFormatUpdateInputType, { message })
        }
      })
    }
  }
  const mutation = useMutation({
    mutationFn: updateMovieFormat,
    onError: handleMutationError,
  })

  return mutation
}
