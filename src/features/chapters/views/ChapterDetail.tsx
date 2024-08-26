'use client'

import { DetailItem } from '@/features/article/components'
import { Header } from '@/libs/components/Form/Layout/Header'
import { Modal } from '@/libs/components/Modal'
import { formatDate } from '@/utils/format'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useChapterDetailQuery, useDeleteChapter } from '../hooks'

const ChapterDetail = () => {
  const { chaptersId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { deleteChapter } = useDeleteChapter()

  const handleDeleteChapter = () => {
    deleteChapter(chaptersId as string, {
      onSuccess: () => {
        enqueueSnackbar('Xoá chương thành công', {
          variant: 'success',
        })
        router.push('/chapters')
      },
    })
  }

  const { data, isLoading } = useChapterDetailQuery(chaptersId as string)
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
              <DetailItem label="Tên chương" value={data?.name} isPending={isLoading} />
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
            <Stack direction="row" gap={4}>
              <DetailItem
                image={{
                  src: data?.url as string,
                  alt: 'Image chapter',
                }}
                label="Hình ảnh"
                isPending={isLoading}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Modal
        handleCloseModal={handleCloseModal}
        open={open}
        handleSubmit={handleDeleteChapter}
        textSubmit="Đồng ý"
        description={`Bạn có thực sự muốn xóa chương này chứ ?`}
        title="Xóa chương"
      />
    </Stack>
  )
}

export { ChapterDetail }
