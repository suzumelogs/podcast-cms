import { deleteMovie } from '@/libs/api/movie'
import { useMutation } from '@tanstack/react-query'

export const useDeleteMovie = () => {
  const { mutate } = useMutation({
    mutationFn: deleteMovie,
  })

  return {
    deleteMovie: mutate,
  }
}
