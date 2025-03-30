import { getListEpisodes } from '@/libs/api/episodes'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { EpisodeSearchInputType, EpisodeType } from '../type'
import { TSearch } from '../views'

export const useEpisodeListQuery = ({ bookId, categoryId, chapterId, name, author }: TSearch) => {
  const { input, getTableData, sortOptions } = useTableContext<
    EpisodeType,
    EpisodeSearchInputType
  >()
  const { page, limit } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: [
      'episode-list',
      page,
      name,
      author,
      limit,
      sort_by,
      column,
      bookId,
      categoryId,
      chapterId,
    ],
    queryFn: () =>
      getListEpisodes({
        author,
        name,
        page,
        limit,
        bookId,
        categoryId,
        chapterId,
        sortBy: sort_by,
        column,
      }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.pagination?.totalPages || 0,
  }
}
