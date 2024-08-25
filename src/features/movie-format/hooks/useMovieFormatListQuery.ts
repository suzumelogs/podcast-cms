import { getListMovieFormat } from '@/libs/api/movie-format'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { MovieFormatSearchInputType, MovieFormatType } from '../type'

export const useMovieFormatListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    MovieFormatType,
    MovieFormatSearchInputType
  >()
  const { page, limit, search } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['movieFormatList', page, limit, search, sort_by, column],
    queryFn: () => getListMovieFormat({ ...input, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
  }
}
