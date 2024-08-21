import { getMovieType } from '@/libs/api/movie-type'
import { useQuery } from '@tanstack/react-query'

export const useMovieTypeDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['movieType', id],
    queryFn: () => getMovieType(id),
    enabled: !!id,
  })

  return data
}
