import { getMovieFormat } from '@/libs/api/movie-format'
import { useQuery } from '@tanstack/react-query'

export const useMovieFormatDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['movieFormat', id],
    queryFn: () => getMovieFormat(id),
    enabled: !!id,
  })

  return data
}
