import { deleteMovieType } from '@/libs/api/movie-type'
import { useMutation } from '@tanstack/react-query'

export const useDeleteMovieType = () => {
  const { mutate } = useMutation({
    mutationFn: deleteMovieType,
  })

  return {
    deleteMovieType: mutate,
  }
}
