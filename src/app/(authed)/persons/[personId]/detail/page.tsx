import { PersonDetail } from '@/features/person/views'
import { TableProvider } from '@/libs/components/Table'

export default function Page() {
  return (
    <TableProvider>
      <PersonDetail />
    </TableProvider>
  )
}
