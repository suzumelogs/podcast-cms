import { getPerson } from '@/libs/api/person'
import { useQuery } from '@tanstack/react-query'

export const usePersonDetail = (id: string) => {
  const data = useQuery({
    queryKey: ['person', id],
    queryFn: () => getPerson(id),
    enabled: !!id,
  })

  return data
}
