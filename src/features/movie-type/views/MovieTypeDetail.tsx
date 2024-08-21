'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDeleteMovieType, useMovieTypeDetailQuery } from '../hooks'

const MovieTypeDetail = () => {
  const { movieTypeId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { deleteMovieType } = useDeleteMovieType()

  const handleDeleteMovieType = () => {
    deleteMovieType(movieTypeId as string, {
      onSuccess: () => {
        router.push('/movie-type')
      },
    })
  }

  const { data, isLoading } = useMovieTypeDetailQuery(movieTypeId as string)
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
        handleSubmit={handleDeleteMovieType}
        textSubmit="Submit"
        description={`Are you sure you want to delete this movie type?`}
        title="Delete data..."
      />
    </Stack>
  )
}

export { MovieTypeDetail }
