'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input, UploadImage } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
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
    setValue,
    formState: { isDirty },
  } = useForm<ChapterCreateInputType>({
    defaultValues: {
      name: '',
      description: '',
      file: null,
    },
    resolver: zodResolver(ChapterCreateInputSchema),
  })

  useEffect(() => {
    if (chapterDetail) {
      setValue('name', chapterDetail.name as string)
      setValue('description', chapterDetail.description as string)
    }
  }, [setValue, chapterDetail])

  const { mutate: createChapter, isPending: isPendingCreate } = useChapterCreate(setError)
  const { mutate: updateChapter, isPending: isPendingUpdate } = useChapterUpdate(setError)

  const onSubmit: SubmitHandler<ChapterCreateInputType> = (data) => {
    const submitData = { ...data, _id: chaptersId as string }

    const successCallback = () => {
      enqueueSnackbar(chaptersId ? 'Cập nhật sách thành công' : 'Thêm mới sách thành công', {
        variant: 'success',
      })
      router.push(chaptersId ? `/chapters/${chaptersId}/detail` : '/chapters')
    }

    if (chaptersId) {
      updateChapter(submitData, { onSuccess: successCallback })
    } else {
      createChapter(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={chaptersId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
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
          <Stack direction={'row'} gap={1}>
            <Stack
              minWidth={120}
              padding="4px 8px"
              bgcolor="base.white"
              justifyContent="center"
              sx={{ height: 44 }}
            >
              <Typography variant="body2" color="grey.500">
                Hình ảnh
              </Typography>
            </Stack>
            <UploadImage name="file" control={control} />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { ChapterForm }
