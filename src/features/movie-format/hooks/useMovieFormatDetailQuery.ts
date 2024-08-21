import { getMovieFormatDetail } from '@/libs/api/movie-format'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { MovieFormatDetailResponseType, QueryInputMovieFormatDetailType } from '../type'

export const useMovieFormatDetailQuery = (movieFormatId: string) => {
  const { sortOptions } = useTableContext<
    MovieFormatDetailResponseType,
    QueryInputMovieFormatDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['movieFormat', movieFormatId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getMovieFormatDetail({ movieFormatId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
