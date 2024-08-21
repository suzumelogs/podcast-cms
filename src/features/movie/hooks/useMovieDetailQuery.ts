import { getMovieDetail } from '@/libs/api/movie'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { MovieDetailResponseType, QueryInputMovieDetailType } from '../type'

export const useMovieDetailQuery = (movieId: string) => {
  const { sortOptions } = useTableContext<MovieDetailResponseType, QueryInputMovieDetailType>()

  const { data, error, isLoading } = useQuery({
    queryKey: ['movie', movieId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getMovieDetail({ movieId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
