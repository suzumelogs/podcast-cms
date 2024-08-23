import { getListChapters } from '@/libs/api/chapters'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { ChapterSearchInputType, ChapterType } from '../type'

export const useChapterListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    ChapterType,
    ChapterSearchInputType
  >()
  const { page, search } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['chapters-list', page, search, sort_by, column],
    queryFn: () => getListChapters({ ...input, limit: input.per_page, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
  }
}
