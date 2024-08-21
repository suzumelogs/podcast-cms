import { getListPerson } from '@/libs/api/person'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { PersonSearchInputType, PersonType } from '../type'

export const usePersonListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<PersonType, PersonSearchInputType>()
  const { page, per_page, search } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['personList', page, per_page, search, sort_by, column],
    queryFn: () => getListPerson({ ...input, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
  }
}
