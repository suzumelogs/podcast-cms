'use client'

import { StatusTag } from '@/libs/components/StatusTag'
import { ReactTable } from '@/libs/components/Table'
import { generateMediaUrl } from '@/utils/media'
import { Stack } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { useEpisodeListQuery } from '../hooks'
import { EpisodeType } from '../type'
import { EpisodeFilter } from './EpisodeFilter'

export type TSearch = {
  bookId: string | null
  categoryId: string | null
  chapterId: string | null
  name: string | null
  author: string | null
}

const EpisodeList = () => {
  const [search, setSearch] = useState<TSearch>({
    bookId: null,
    categoryId: null,
    chapterId: null,
    name: null,
    author: null,
  })
  const { tableData, totalPages } = useEpisodeListQuery(search)

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px',
  }

  const columns: ColumnDef<EpisodeType>[] = [
    {
      header: 'ID',
      accessorFn: (row, index) => index + 1,
      meta: {
        width: 56,
        headStyle: {
          padding: '8px 24px',
        },
        cellStyle: {
          width: 56,
          textAlign: 'center',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '8px',
        },
      },
    },
    {
      header: 'Tên tập',
      accessorKey: 'title',
      meta: {
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Hình ảnh',
      accessorKey: 'artwork',
      meta: {
        width: 100,
        headStyle: {
          padding: '8px',
        },
        cellStyle: {
          padding: '8px',
          textAlign: 'center',
          width: 100,
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
              row.original?.artwork
                ? generateMediaUrl(row.original?.artwork, 'image')
                : 'https://demofree.sirv.com/nope-not-here.jpg'
            }
          />
        </Stack>
      ),
    },
    {
      header: 'Album',
      accessorKey: 'album',
      meta: {
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Tác giả',
      accessorKey: 'artist',
      meta: {
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Mô tả',
      accessorKey: 'description',
      meta: {
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
    },
    {
      header: 'Trả phí',
      accessorKey: 'isPremium',
      meta: {
        width: 180,
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
      cell: ({ row }) => (
        <StatusTag
          text={row.original.isPremium ? 'Có' : 'Không'}
          color={row.original.isPremium ? 'green' : 'red'}
        />
      ),
    },
    {
      header: 'Top',
      accessorKey: 'isTop',
      meta: {
        width: 150,
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 150,
        },
      },
      cell: ({ row }) => (
        <StatusTag
          text={row.original.isTop ? 'Có' : 'Không'}
          color={row.original.isTop ? 'green' : 'red'}
        />
      ),
    },
  ]

  return (
    <Stack gap={8} flexDirection="column">
      <EpisodeFilter search={search} setSearch={setSearch} />

      <ReactTable
        {...tableData}
        columns={columns}
        next={totalPages}
        action={{
          disabledDetail: false,
          onDetail: (_id) => {
            const url = `/episodes/${_id}/detail`
            window.open(url, '_blank')
          },
        }}
      />
    </Stack>
  )
}

export { EpisodeList }
