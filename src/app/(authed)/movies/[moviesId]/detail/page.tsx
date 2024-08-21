import { MovieDetail } from '@/features/movie'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <MovieDetail />
    </TableProvider>
  )
}
