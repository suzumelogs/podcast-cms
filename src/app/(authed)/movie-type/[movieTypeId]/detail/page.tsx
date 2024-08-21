import { MovieTypeDetail } from '@/features/movie-type'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <MovieTypeDetail />
    </TableProvider>
  )
}
