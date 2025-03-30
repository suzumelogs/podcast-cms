import { getBookValueLabels } from '@/libs/api/books'
import { useQuery } from '@tanstack/react-query'

export const useBookValueLabel = (categoryId?: string | null) => {
  const data = useQuery({
    queryKey: ['book-value-label', categoryId],
    queryFn: () => getBookValueLabels(categoryId),
  })
  return data
}
