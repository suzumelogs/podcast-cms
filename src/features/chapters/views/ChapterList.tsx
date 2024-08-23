'use client'

import { ReactTable } from '@/libs/components/Table'
import { formatDate } from '@/utils/format'
import { Stack } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useChapterListQuery } from '../hooks'
import { ChapterType } from '../type'

const ChapterList = () => {
  const { tableData } = useChapterListQuery()
  const router = useRouter()

  const columns: ColumnDef<ChapterType>[] = [
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
      header: 'Tên chương',
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
      cell: ({ row }) => {
        return (
          <>
            <Stack flexDirection={'row'} alignItems={'center'} columnGap={1}>
              <Stack
                width={'40px'}
                height={'40px'}
                component={'img'}
                borderRadius={'2px'}
                src={'https://demofree.sirv.com/nope-not-here.jpg'}
              />
            </Stack>
          </>
        )
      },
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
      cell: ({ row }) => {
        return formatDate(row.original.createdAt as string)
      },
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
      cell: ({ row }) => {
        return formatDate(row.original.createdAt as string)
      },
    },
  ]
  return (
    <ReactTable
      {...tableData}
      columns={columns}
      action={{
        disabledDetail: false,
        onDetail: (_id) => {
          router.push(`/chapters/${_id}/detail`)
        },
      }}
    />
  )
}

export { ChapterList }
