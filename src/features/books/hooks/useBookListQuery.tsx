import { getListBooks } from '@/libs/api/books'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { BookSearchInputType, BookType } from '../type'

export const useBookListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<BookType, BookSearchInputType>()
  const { page, search } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['book-list', page, search, sort_by, column],
    queryFn: () => getListBooks({ ...input, limit: input.per_page, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
  }
}
