import { EpisodeList } from '@/features/episodes'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <EpisodeList />
    </TableProvider>
  )
}
