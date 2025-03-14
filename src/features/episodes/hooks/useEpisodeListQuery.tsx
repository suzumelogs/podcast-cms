import { getListEpisodes } from '@/libs/api/episodes'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { EpisodeSearchInputType, EpisodeType } from '../type'

export const useEpisodeListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    EpisodeType,
    EpisodeSearchInputType
  >()
  const { page, limit, name, author, bookId, categoryId, chapterId } = input
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
    queryFn: () => getListEpisodes({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.pagination?.totalPages || 0,
  }
}
