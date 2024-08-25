'use client'

import { ReactTable } from '@/libs/components/Table'
import { formatDate } from '@/utils/format'
import { Stack } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useBookListQuery } from '../hooks'
import { BookType } from '../type'

const BookList = () => {
  const { tableData, next } = useBookListQuery()
  const router = useRouter()
  console.log(next)

  const columns: ColumnDef<BookType>[] = [
    {
      header: 'ID',
      accessorFn: (row, index) => index + 1,
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
      header: 'Tên sách',
      accessorKey: 'name',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          width: 200,
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 16px',
        },
      },
    },
    {
      header: 'Hình ảnh',
      accessorKey: 'imageUrl',
      meta: {
        headStyle: {
          padding: '0 8px',
        },
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
        },
      },
      cell: ({ row }) => (
        <Stack flexDirection={'row'} alignItems={'center'} columnGap={1}>
          <Stack
            width={'40px'}
            height={'40px'}
            component={'img'}
            borderRadius={'2px'}
            src={row.original?.url ?? 'https://demofree.sirv.com/nope-not-here.jpg'}
          />
        </Stack>
      ),
    },
    {
      header: 'Mô tả',
      accessorKey: 'description',
      meta: {
        headStyle: {
          padding: '0 8px',
        },
        cellStyle: {
          width: '200px',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
        },
      },
    },
    {
      header: 'Ngày tạo',
      accessorKey: 'createdAt',
      meta: {
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          textAlign: 'start',
        },
      },
      cell: ({ row }) => formatDate(row.original.createdAt as string),
    },
    {
      header: 'Ngày cập nhật',
      accessorKey: 'updatedAt',
      meta: {
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          textAlign: 'start',
        },
      },
      cell: ({ row }) => formatDate(row.original.updatedAt as string),
    },
  ]

  return (
    <ReactTable
      {...tableData}
      columns={columns}
      next={next}
      action={{
        disabledDetail: false,
        onDetail: (_id) => {
          router.push(`/books/${_id}/detail`)
        },
      }}
    />
  )
}

export { BookList }