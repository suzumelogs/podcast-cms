import { getMovieTypeDetail } from '@/libs/api/movie-type'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { MovieTypeDetailResponseType, QueryInputMovieTypeDetailType } from '../type'

export const useMovieTypeDetailQuery = (movieTypeId: string) => {
  const { sortOptions } = useTableContext<
    MovieTypeDetailResponseType,
    QueryInputMovieTypeDetailType
  >()

  const { data, error, isLoading } = useQuery({
    queryKey: ['movieType', movieTypeId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getMovieTypeDetail({ movieTypeId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
