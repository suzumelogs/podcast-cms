'use client'

import { DetailItem } from '@/features/article/components'
import { FormLayout, Input, UploadImage } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCategoryCreate, useCategoryDetail, useCategoryUpdate } from '../hooks'
import { CategoryCreateInputSchema, CategoryCreateInputType } from '../type'

const CategoryForm = () => {
  const router = useRouter()
  const { categoryId } = useParams()
  const { data: categoryDetail } = useCategoryDetail(categoryId as string)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useForm<CategoryCreateInputType>({
    defaultValues: {
      name: '',
      description: '',
      file: '',
    },
    resolver: zodResolver(CategoryCreateInputSchema),
    values: {
      name: categoryDetail?.name || '',
      description: categoryDetail?.description || '',
      imageUrl: categoryDetail?.imageUrl || '',
    },
  })

  const { mutate: createCategory } = useCategoryCreate(setError)
  const { mutate: updateCategory } = useCategoryUpdate(setError)

  const onSubmit: SubmitHandler<CategoryCreateInputType> = (data) => {
    if (categoryId) {
      updateCategory(
        { _id: categoryId as string, ...data },
        {
          onSuccess: () => {
            enqueueSnackbar('Cập nhật sách thành công', { variant: 'success' })
            router.push(`/categories/${categoryId}/detail`)
          },
        },
      )
      return
    }

    createCategory(data, {
      onSuccess: () => {
        enqueueSnackbar('Thêm mới sách thành công', { variant: 'success' })
        router.push('/categories')
      },
    })
  }

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={categoryId ? 'Cập nhật' : 'Tạo mới'}
      isDirty={isDirty}
    >
      <Stack direction="row">
        <Stack spacing={1} width={{ xs: '100%', lg: '50%' }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={4} alignItems={{ lg: 'center' }}>
            <DetailItem
              label="ID"
              value={categoryDetail?._id || '-'}
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

export { CategoryForm }
