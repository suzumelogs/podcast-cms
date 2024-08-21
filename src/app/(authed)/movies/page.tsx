import { MovieFilter, MovieList } from '@/features/movie'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <MovieFilter />
      <MovieList />
    </TableProvider>
  )
}
