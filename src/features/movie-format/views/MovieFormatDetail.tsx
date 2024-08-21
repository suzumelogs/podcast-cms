'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDeleteMovieFormat, useMovieFormatDetailQuery } from '../hooks'

const MovieFormatDetail = () => {
  const { movieFormatId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { deleteMovieFormat } = useDeleteMovieFormat()

  const handleDeleteMovieFormat = () => {
    deleteMovieFormat(movieFormatId as string, {
      onSuccess: () => {
        router.push('/movie-format')
      },
    })
  }

  const { data, isLoading } = useMovieFormatDetailQuery(movieFormatId as string)
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
        handleSubmit={handleDeleteMovieFormat}
        textSubmit="Submit"
        description={`Are you sure you want to delete this movie format?`}
        title="Delete data..."
      />
    </Stack>
  )
}

export { MovieFormatDetail }
