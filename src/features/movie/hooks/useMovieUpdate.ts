import { updateMovie } from '@/libs/api/movie'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { useMutation } from '@tanstack/react-query'
import { UseFormSetError } from 'react-hook-form'
import { MovieUpdateInputType } from '../type'

export const useMovieUpdate = (setError: UseFormSetError<MovieUpdateInputType>) => {
  const handleMutationError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      Object.entries(errorValidation).forEach(([key, message]) => {
        if (message) {
          setError(key as keyof MovieUpdateInputType, { message })
        }
      })
    }
  }
  const mutation = useMutation({
    mutationFn: updateMovie,
    onError: handleMutationError,
  })

  return mutation
}
