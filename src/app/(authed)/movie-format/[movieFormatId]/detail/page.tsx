import { MovieFormatDetail } from '@/features/movie-format'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <MovieFormatDetail />
    </TableProvider>
  )
}
