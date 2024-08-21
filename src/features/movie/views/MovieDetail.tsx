'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDeleteMovie, useMovieDetailQuery } from '../hooks'

const MovieDetail = () => {
  const { moviesId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { deleteMovie } = useDeleteMovie()

  const handleDeleteMovie = () => {
    deleteMovie(moviesId as string, {
      onSuccess: () => {
        router.push('/movie')
      },
    })
  }

  const { data, isLoading } = useMovieDetailQuery(moviesId as string)

  return (
    <Stack spacing={10}>
      <Stack spacing={4}>
        <Header title="Details" editPath="edit" deleteFunction={handleOpenModal} />

        <Stack spacing={2}>
          <Stack spacing="1px">
            <Stack direction="row" gap={4}>
              <DetailItem label="ID" value={data?.id} isPending={isLoading} />
              <DetailItem label="Brief movie" value={data?.brief_movie} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="Name" value={data?.name} isPending={isLoading} />
              <DetailItem label="Trailer movie" value={data?.trailer_movie} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="National" value={data?.national} isPending={isLoading} />
              <DetailItem label="Ticket price" value={data?.ticket_price} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Released at"
                value={formatDate(data?.released_at as string)}
                isPending={isLoading}
              />
              <DetailItem
                label="Created at"
                value={formatDate(data?.created_at as string)}
                isPending={isLoading}
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Language movie"
                value={data?.language_movie}
                isPending={isLoading}
              />
              <DetailItem
                label="Updated at"
                value={formatDate(data?.updated_at as string)}
                isPending={isLoading}
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="Duration" value={data?.duration} isPending={isLoading} />
              <DetailItem
                label="Deleted at"
                value={data?.deleted_at ?? 'Not deleted'}
                isPending={isLoading}
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="Limit_age" value={data?.limit_age} isPending={isLoading} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteMovie}
        textSubmit="Submit"
        description={`Are you sure you want to delete this movie format?`}
        title="Delete data..."
      />
    </Stack>
  )
}

export { MovieDetail }
