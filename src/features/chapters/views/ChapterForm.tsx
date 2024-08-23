'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useChapterCreate, useChapterDetail, useChapterUpdate } from '../hooks'
import { ChapterCreateInputSchema, ChapterCreateInputType } from '../type'

const ChapterForm = () => {
  const router = useRouter()
  const { chaptersId } = useParams()
  const { data: chapterDetail } = useChapterDetail(chaptersId as string)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useForm<ChapterCreateInputType>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(ChapterCreateInputSchema),
    values: {
      name: chapterDetail?.name || '',
      description: chapterDetail?.description || '',
    },
  })

  const { mutate: createChapter } = useChapterCreate(setError)
  const { mutate: updateChapter } = useChapterUpdate(setError)

  const onSubmit: SubmitHandler<ChapterCreateInputType> = (data) => {
    if (chaptersId) {
      updateChapter(
        { _id: chaptersId as string, ...data },
        {
          onSuccess: () => {
            enqueueSnackbar('Cập nhật chương thành công', { variant: 'success' })
            router.push(`/chapters/${chaptersId}/detail`)
          },
        },
      )
      return
    }

    createChapter(data, {
      onSuccess: () => {
        enqueueSnackbar('Thêm mới chương thành công', { variant: 'success' })
        router.push('/chapter')
      },
    })
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={chaptersId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
    >
      <Stack direction="row">
        <Stack spacing={1} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={chapterDetail?._id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="name"
              label="Tên chương"
              labelLeft
              placeholder="Tên chương"
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="description"
              label="Mô tả"
              labelLeft
              placeholder="Mô tả"
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { ChapterForm }
