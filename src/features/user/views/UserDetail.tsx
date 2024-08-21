'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import BookMark from 'public/assets/svgs/book_mark.svg'
import { useState } from 'react'
import { getColorRole, getTextRole } from '../constants'
import { useDeleteUser, useUserDetailQuery } from '../hooks'

const UserDetail = () => {
  const { userId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { deleteUser } = useDeleteUser()
  const handleDeleteUser = () => {
    deleteUser(userId as string, {
      onSuccess: () => {
        router.push('/users')
      },
    })
  }

  const { data, isLoading } = useUserDetailQuery(userId as string)

  return (
    <Stack spacing={10}>
      <Stack spacing={4}>
        <Header title="Details" editPath="edit" deleteFunction={handleOpenModal} />

        <Stack spacing={2}>
          <Stack spacing="1px">
            <Stack direction="row" gap={4}>
              <DetailItem label="ID" value={data?.id} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="User name" value={data?.name} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="Email" value={data?.email} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Role"
                status={{
                  text: getTextRole(data?.role),
                  color: getColorRole(data?.role),
                }}
                isPending={isLoading}
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Account status"
                status={{
                  text: data?.is_active == 1 ? 'Active' : 'Un Active',
                  color: data?.is_active == 1 ? 'green' : 'red',
                }}
                isPending={isLoading}
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Created at"
                value={formatDate(data?.created_at as string)}
                isPending={isLoading}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Stack direction="row" spacing="4px" alignItems="center">
            <BookMark />
            <Typography variant="h3" color="grey.600">
              Comming soon...
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteUser}
        textSubmit="Submit"
        description={`Are you sure you want to delete this user?`}
        title="Delete data..."
      />
    </Stack>
  )
}

export { UserDetail }
