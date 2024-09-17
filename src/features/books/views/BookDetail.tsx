'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Box, Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useBookDetailQuery, useDeleteBook } from '../hooks'

const BookDetail = () => {
  const { booksId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { deleteBook } = useDeleteBook()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleDeleteBook = () => {
    deleteBook(booksId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá sách thành công', { variant: 'success' })
        router.push('/books')
      },
    })
  }

  const { data, isLoading } = useBookDetailQuery(booksId as string)

  return (
    <Stack spacing={4}>
      <Header title="Chi tiết sách" editPath="edit" deleteFunction={handleOpenModal} />

      <Box>
        <Stack spacing={2}>
          <DetailItem label="ID" value={data?._id} isPending={isLoading} />
          <DetailItem label="Tên sách" value={data?.name} isPending={isLoading} />
          <DetailItem label="Tác giả" value={data?.author} isPending={isLoading} />
          <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
          <DetailItem
            status={{
              text: data?.isPremium ? 'Có' : 'Không',
              color: data?.isPremium ? 'green' : 'red',
            }}
            label="Trả phí"
            isPending={isLoading}
          />
          <DetailItem
            label="Ngày tạo"
            value={formatDate(data?.createdAt as string)}
            isPending={isLoading}
          />
          <DetailItem
            label="Ngày cập nhật"
            value={formatDate(data?.updatedAt as string)}
            isPending={isLoading}
          />
          <DetailItem
            image={{
              src: data?.url as string,
              alt: 'Hình ảnh sách',
            }}
            label="Hình ảnh"
          />
        </Stack>
      </Box>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteBook}
        textSubmit="Đồng ý"
        description="Bạn có thực sự muốn xóa sách này?"
        title="Xóa sách"
      />
    </Stack>
  )
}

export { BookDetail }
