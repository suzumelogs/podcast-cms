import { getMovie } from '@/libs/api/movie'
import { useQuery } from '@tanstack/react-query'

export const useMovieDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovie(id),
    enabled: !!id,
  })

  return data
}
