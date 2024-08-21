import { deleteMovieFormat } from '@/libs/api/movie-format'
import { useMutation } from '@tanstack/react-query'

export const useDeleteMovieFormat = () => {
  const { mutate } = useMutation({
    mutationFn: deleteMovieFormat,
  })

  return {
    deleteMovieFormat: mutate,
  }
}
