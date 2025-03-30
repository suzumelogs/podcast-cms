import { ChapterList } from '@/features/chapters'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <ChapterList />
    </TableProvider>
  )
}
