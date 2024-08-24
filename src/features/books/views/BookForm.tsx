'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input, UploadImage } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useBookCreate, useBookDetail, useBookUpdate } from '../hooks'
import { BookCreateInputSchema, BookCreateInputType } from '../type'

const BookForm = () => {
  const router = useRouter()
  const { bookId } = useParams()
  const { data: bookDetail } = useBookDetail(bookId as string)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useForm<BookCreateInputType>({
    defaultValues: {
      name: '',
      description: '',
      file: '',
    },
    resolver: zodResolver(BookCreateInputSchema),
    values: {
      name: bookDetail?.name || '',
      description: bookDetail?.description || '',
      url: bookDetail?.url || '',
    },
  })

  const { mutate: createBook } = useBookCreate(setError)
  const { mutate: updateBook } = useBookUpdate(setError)

  const onSubmit: SubmitHandler<BookCreateInputType> = (data) => {
    if (bookId) {
      updateBook(
        { _id: bookId as string, ...data },
        {
          onSuccess: () => {
            enqueueSnackbar('Cập nhật sách thành công', { variant: 'success' })
            router.push(`/books/${bookId}/detail`)
          },
        },
      )
      return
    }

    createBook(data, {
      onSuccess: () => {
        enqueueSnackbar('Thêm mới sách thành công', { variant: 'success' })
        router.push('/books')
      },
    })
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={bookId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
    >
      <Stack direction="row">
        <Stack spacing={1} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={bookDetail?._id || '-'}
              valueSx={{ width: { xs: '100%', lg: 500 } }}
            />
          </Stack>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4}>
            <Input
              control={control}
              name="name"
              label="Tên sách"
              labelLeft
              placeholder="Tên sách"
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

export { BookForm }
