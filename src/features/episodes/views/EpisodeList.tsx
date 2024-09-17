'use client'

import { StatusTag } from '@/libs/components/StatusTag'
import { ReactTable } from '@/libs/components/Table'
import { Stack } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEpisodeListQuery } from '../hooks'
import { EpisodeType } from '../type'

const EpisodeList = () => {
  const { tableData, totalPages } = useEpisodeListQuery()
  const router = useRouter()

  const commonCellStyle = {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    padding: '8px 16px', // Điều chỉnh padding để tạo khoảng cách đều giữa các cột
  }

  const columns: ColumnDef<EpisodeType>[] = [
    {
      header: 'ID',
      accessorFn: (row, index) => index + 1,
      meta: {
        width: 56,
        headStyle: {
          padding: '8px 24px', // Điều chỉnh padding để cân bằng
        },
        cellStyle: {
          width: 56,
          textAlign: 'center',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '8px', // Giữ khoảng cách cột này nhỏ hơn để không chiếm diện tích
        },
      },
    },
    {
      header: 'Tên tập',
      accessorKey: 'title',
      meta: {
        headStyle: {
          padding: '8px 16px', // Cân bằng padding với các cột khác
        },
        cellStyle: {
          ...commonCellStyle,
          width: 250,
        },
      },
    },
    {
      header: 'Hình ảnh',
      accessorKey: 'artWork',
      meta: {
        width: 100,
        headStyle: {
          padding: '8px', // Giảm khoảng cách padding của cột hình ảnh
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
            src={row.original?.artWork ?? 'https://demofree.sirv.com/nope-not-here.jpg'}
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
          width: 200,
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
          width: 200,
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
          width: 200,
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
          width: 180,
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
        width: 180,
        headStyle: {
          padding: '8px 16px',
        },
        cellStyle: {
          ...commonCellStyle,
          width: 180,
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
    <ReactTable
      {...tableData}
      columns={columns}
      next={totalPages}
      action={{
        disabledDetail: false,
        onDetail: (_id) => {
          router.push(`/episodes/${_id}/detail`)
        },
      }}
    />
  )
}

export { EpisodeList }
