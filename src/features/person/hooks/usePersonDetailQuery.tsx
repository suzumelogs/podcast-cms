import { getPersonDetail } from '@/libs/api/person'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { PersonDetailResponseType, QueryInputPersonDetailType } from '../type'

export const usePersonDetailQuery = (personId: string) => {
  const { sortOptions } = useTableContext<PersonDetailResponseType, QueryInputPersonDetailType>()

  const { data, error, isLoading } = useQuery({
    queryKey: ['person', personId, sortOptions?.sort_by, sortOptions?.column],
    queryFn: () => getPersonDetail({ personId, ...sortOptions }),
  })

  return { data, error, isLoading }
}
