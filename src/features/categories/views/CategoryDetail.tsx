'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCategoryDetailQuery, useDeleteCategory } from '../hooks'

const CategoryDetail = () => {
  const { categoriesId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { deleteMovieFormat } = useDeleteCategory()

  const handleDeleteMovieFormat = () => {
    deleteMovieFormat(categoriesId as string, {
      onSuccess: () => {
        router.push('/categories')
      },
    })
  }

  const { data, isLoading } = useCategoryDetailQuery(categoriesId as string)
  return (
    <Stack spacing={10}>
      <Stack spacing={4}>
        <Header title="Chi tiết" editPath="edit" deleteFunction={handleOpenModal} />

        <Stack spacing={2}>
          <Stack spacing="1px">
            <Stack direction="row" gap={4}>
              <DetailItem label="ID" value={data?._id} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="Tên sách" value={data?.name} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem label="Mô tả" value={data?.description} isPending={isLoading} />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Ngày tạo"
                value={formatDate(data?.createdAt as string)}
                isPending={isLoading}
              />
            </Stack>
            <Stack direction="row" gap={4}>
              <DetailItem
                label="Ngày cập nhật"
                value={formatDate(data?.updatedAt as string)}
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
        textSubmit="Đồng ý"
        description={`Bạn có thực sự muốn xóa sách chứ ?`}
        title="Xóa sách"
      />
    </Stack>
  )
}

export { CategoryDetail }
