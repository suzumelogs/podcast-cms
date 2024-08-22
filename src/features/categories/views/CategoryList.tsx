'use client'

import { ReactTable } from '@/libs/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useCategoryListQuery } from '../hooks'
import { CategoryType } from '../type'

const CategoryList = () => {
  const { tableData } = useCategoryListQuery()
  const router = useRouter()

  const columns: ColumnDef<CategoryType>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      meta: {
        width: 56,
        headStyle: {
          padding: '0 24px',
        },
        cellStyle: {
          width: 56,
          textAlign: 'center',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
        },
      },
    },
    {
      header: 'Name',
      accessorKey: 'name',
      meta: {
        headStyle: {
          display: 'flex',
          justifyContent: 'center',
        },
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          display: 'flex',
          justifyContent: 'center',
        },
      },
    },
  ]
  return (
    <ReactTable
      {...tableData}
      columns={columns}
      action={{
        disabledDetail: false,
        onDetail: (id) => {
          router.push(`/categories/${id}/detail`)
        },
      }}
    />
  )
}

export { CategoryList }
