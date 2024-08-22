import { getListCategories } from '@/libs/api/categories'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { CategorySearchInputType, CategoryType } from '../type'

export const useCategoryListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    CategoryType,
    CategorySearchInputType
  >()
  const { page, search } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['category-list', page, search, sort_by, column],
    queryFn: () => getListCategories({ ...input, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
  }
}
