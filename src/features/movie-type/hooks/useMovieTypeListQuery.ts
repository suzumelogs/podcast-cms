import { getListMovieType } from '@/libs/api/movie-type'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { MovieTypeSearchInputType, MovieTypeType } from '../type'

export const useMovieTypeListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    MovieTypeType,
    MovieTypeSearchInputType
  >()
  const { page, per_page, search } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['movieTypeList', page, per_page, search, sort_by, column],
    queryFn: () => getListMovieType({ ...input, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
  }
}
