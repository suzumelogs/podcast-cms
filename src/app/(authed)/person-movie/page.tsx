import { PersonMovieFilter, PersonMovieList } from '@/features/person-movie/views'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <PersonMovieFilter />
      <PersonMovieList />
    </TableProvider>
  )
}
