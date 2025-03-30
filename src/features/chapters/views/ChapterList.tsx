'use client'

import { StatusTag } from '@/libs/components/StatusTag'
import { ReactTable } from '@/libs/components/Table'
import { generateMediaUrl } from '@/utils/media'
import { Stack } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useChapterListQuery } from '../hooks'
import { ChapterType } from '../type'
import { ChapterFilter } from './ChapterFilter'

export type TChapterSearch = {
  categoryId: string | null
  bookId: string | null
  name: string | null
}

const ChapterList = () => {
  const [search, setSearch] = useState<TChapterSearch>({
    categoryId: null,
    bookId: null,
    name: null,
  })

  const { tableData, totalPages } = useChapterListQuery(search)
  const router = useRouter()

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '0 16px',
  }

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
      header: 'Tên sách',
      accessorKey: 'name',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 200,
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
          padding: '0 8px',
          textAlign: 'center',
          width: 50,
        },
      },
      cell: ({ row }) => (
        <Stack flexDirection="row" alignItems="center" columnGap={1}>
          <Stack
            width="40px"
            height="40px"
            component="img"
            borderRadius="2px"
            src={
              row.original?.url
                ? generateMediaUrl(row.original?.url, 'image')
                : 'https://demofree.sirv.com/nope-not-here.jpg'
            }
          />
        </Stack>
      ),
    },
    {
      header: 'Mô tả',
      accessorKey: 'description',
      meta: {
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
        },
      },
    },
    {
      header: 'Trả phí',
      accessorKey: 'isPremium',
      meta: {
        width: 180,
        headStyle: {
          padding: '0 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 180,
        },
      },
      cell: ({ row }) => {
        return (
          <StatusTag
            text={row.original.isPremium == true ? 'Có' : 'Không'}
            color={row.original.isPremium == true ? 'green' : 'red'}
          />
        )
      },
    },
  ]

  return (
    <Stack gap={8} flexDirection="column">
      <ChapterFilter search={search} setSearch={setSearch} />

      <ReactTable
        {...tableData}
        columns={columns}
        next={totalPages}
        action={{
          disabledDetail: false,
          onDetail: (_id) => {
            router.push(`/chapters/${_id}/detail`)
          },
        }}
      />
    </Stack>
  )
}

export { ChapterList }
