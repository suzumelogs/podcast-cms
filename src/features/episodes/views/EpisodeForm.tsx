'use client'

import { DetailItem } from '@/features/article/components'
import { useChapterValueLabel } from '@/features/chapters/hooks/useChapterValueLabel'
import { FormLayout, Input, Select, UploadImage } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEpisodeCreate, useEpisodeDetail, useEpisodeUpdate } from '../hooks'
import { EpisodeCreateInputSchema, EpisodeCreateInputType } from '../type'

const EpisodeForm = () => {
  const router = useRouter()
  const { episodesId } = useParams()
  const { data: episodeDetail } = useEpisodeDetail(episodesId as string)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isDirty },
  } = useForm<EpisodeCreateInputType>({
    defaultValues: {
      title: '',
      album: '',
      artist: '',
      description: '',
      file: null,
      chapterId: '',
    },
    resolver: zodResolver(EpisodeCreateInputSchema),
  })

  useEffect(() => {
    if (episodeDetail) {
      setValue('title', episodeDetail.title as string)
      setValue('album', episodeDetail.album as string)
      setValue('artist', episodeDetail.artist as string)
      setValue('title', episodeDetail.title as string)
      setValue('title', episodeDetail.title as string)
      setValue('description', episodeDetail.description as string)
      setValue('chapterId', episodeDetail.chapterId as string)
    }
  }, [setValue, episodeDetail])

  const { mutate: createEpisode, isPending: isPendingCreate } = useEpisodeCreate(setError)
  const { mutate: updateEpisode, isPending: isPendingUpdate } = useEpisodeUpdate(setError)
  const { data: CHAPTERS } = useChapterValueLabel()

  const onSubmit: SubmitHandler<EpisodeCreateInputType> = (data) => {
    const submitData = { ...data, _id: episodesId as string }

    const successCallback = () => {
      enqueueSnackbar(episodesId ? 'Cập nhật tập thành công' : 'Thêm mới tập thành công', {
        variant: 'success',
      })
      router.push(episodesId ? `/episodes/${episodesId}/detail` : '/episodes')
    }

    if (episodesId) {
      updateEpisode(submitData, { onSuccess: successCallback })
    } else {
      createEpisode(data, { onSuccess: successCallback })
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={episodesId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
      submitLoading={isPendingCreate || isPendingUpdate}
    >
      <Stack direction="row">
        <Stack spacing={1} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={episodeDetail?._id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="title"
              label="Tên tập"
              labelLeft
              placeholder="Tên tập"
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="album"
              label="Album"
              labelLeft
              placeholder="Album"
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="artist"
              label="Tác giả"
              labelLeft
              placeholder="Tác giả"
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
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Select
              control={control}
              name="chapterId"
              label="Chương"
              labelLeft
              placeholder="Chương"
              options={CHAPTERS}
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

export { EpisodeForm }