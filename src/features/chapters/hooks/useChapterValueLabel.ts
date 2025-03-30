import { getChapterValueLabels } from '@/libs/api/chapters'
import { useQuery } from '@tanstack/react-query'

export const useChapterValueLabel = (bookId?: string | null) => {
  const data = useQuery({
    queryKey: ['chapter-value-label', bookId],
    queryFn: () => getChapterValueLabels(bookId),
  })
  return data
}
