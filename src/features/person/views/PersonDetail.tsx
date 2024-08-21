'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeletePerson, usePersonDetailQuery } from '../hooks'

const PersonDetail = () => {
  const { personId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { deletePerson } = useDeletePerson()

  const handleDeletePerson = () => {
    deletePerson(personId as string, {
      onSuccess: () => {
        enqueueSnackbar('Deleted successfully!', { variant: 'success' })
        router.push('/person')
      },
    })
  }

  const { data, isLoading } = usePersonDetailQuery(personId as string)

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
              <DetailItem label="Name" value={data?.name} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="Avatar" value={data?.avatar} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="Position" value={data?.position} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Date of birth"
                value={formatDate(data?.date_of_birth as string)}
                isPending={isLoading}
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="Biography" value={data?.biography} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Created at"
                value={formatDate(data?.created_at as string)}
                isPending={isLoading}
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Updated at"
                value={formatDate(data?.updated_at as string)}
                isPending={isLoading}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeletePerson}
        textSubmit="Submit"
        description={`Are you sure you want to delete this person?`}
        title="Delete data..."
      />
    </Stack>
  )
}

export { PersonDetail }
