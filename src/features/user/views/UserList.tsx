'use client'

import { StatusTag } from '@/libs/components/StatusTag'
import { ReactTable } from '@/libs/components/Table'
import { formatDate } from '@/utils/format'
import { Stack } from '@mui/material'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { getColorRole, getTextRole } from '../constants'
import { useUserListQuery } from '../hooks'
import { UserType } from '../type'

const UserList = () => {
  const { tableData } = useUserListQuery()
  const router = useRouter()

  const columns: ColumnDef<UserType>[] = [
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
      header: 'User name',
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
      cell: ({ row }) => {
        return (
          <>
            <Stack flexDirection={'row'} alignItems={'center'} columnGap={1}>
              <Stack
                borderRadius={'50%'}
                width={'20%'}
                component={'img'}
                src={row.original?.profile_photo_url}
              />
              <p>{row.original.name ? row.original.name : '-'}</p>
            </Stack>
          </>
        )
      },
    },
    {
      header: 'Email',
      accessorKey: 'email',
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
    },
    {
      header: 'Role',
      accessorKey: 'role',
      meta: {
        headStyle: {},
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        },
      },
      cell: ({ row }) => {
        return (
          <StatusTag
            text={getTextRole(row.original?.role ?? 'Unknown')}
            color={getColorRole(row.original?.role) as any}
          />
        )
      },
    },
    {
      header: 'Account status',
      accessorKey: 'status',
      meta: {
        headStyle: {},
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          padding: '0 8px',
        },
      },
      cell: ({ row }) => {
        return (
          <StatusTag
            text={row.original.is_active == 1 ? 'Active' : 'Un Active'}
            color={row.original.is_active == 1 ? 'green' : 'red'}
          />
        )
      },
    },
    {
      header: 'Created at',
      accessorKey: 'created_at',
      meta: {
        cellStyle: {
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          textAlign: 'start',
        },
      },
      cell: ({ row }) => {
        return formatDate(row.original.created_at as string)
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
          router.push(`/users/${id}/detail`)
        },
      }}
    />
  )
}

export { UserList }
