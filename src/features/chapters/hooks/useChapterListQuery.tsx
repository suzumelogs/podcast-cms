import { getListChapters } from '@/libs/api/chapters'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { ChapterSearchInputType, ChapterType } from '../type'
import { TChapterSearch } from '../views'

export const useChapterListQuery = ({ bookId, categoryId, name }: TChapterSearch) => {
  const { input, getTableData, sortOptions } = useTableContext<
    ChapterType,
    ChapterSearchInputType
  >()
  const { page, limit } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['chapter-list', page, name, limit, sort_by, column, bookId, categoryId],
    queryFn: () => getListChapters({ ...input, ...sortOptions, bookId, categoryId, name }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.pagination?.totalPages || 0,
  }
}
