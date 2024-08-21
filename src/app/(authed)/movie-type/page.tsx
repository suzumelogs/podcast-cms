import { MovieTypeFilter, MovieTypeList } from '@/features/movie-type'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <MovieTypeFilter />
      <MovieTypeList />
    </TableProvider>
  )
}
