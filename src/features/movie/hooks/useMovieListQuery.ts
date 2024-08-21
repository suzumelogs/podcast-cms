import { getListMovie } from '@/libs/api/movie'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { MovieSearchInputType, MovieType } from '../type'

export const useMovieListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<MovieType, MovieSearchInputType>()
  const { page, per_page, search } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['movieList', page, per_page, search, sort_by, column],
    queryFn: () => getListMovie({ ...input, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
  }
}
