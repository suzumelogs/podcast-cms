'use client'

import { DetailItem } from '@/features/article/components'
import { DatePicker } from '@/libs/components/DatePicker'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMovieFormatCreate, useMovieFormatDetail, useMovieFormatUpdate } from '../hooks'
import { MovieFormatCreateInputSchema, MovieFormatCreateInputType } from '../type'

const MovieFormatForm = () => {
  const router = useRouter()
  const { movieFormatId } = useParams()
  const { data: movieFormatDetail } = useMovieFormatDetail(movieFormatId as string)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useForm<MovieFormatCreateInputType>({
    defaultValues: {
      name: '',
      created_at: '',
      updated_at: '',
    },
    resolver: zodResolver(MovieFormatCreateInputSchema),
    values: {
      name: movieFormatDetail?.name || '',
      created_at: String(movieFormatDetail?.created_at),
      updated_at: String(movieFormatDetail?.updated_at),
    },
  })

  const { mutate: createMovieFormat } = useMovieFormatCreate(setError)
  const { mutate: updateMovieFormat } = useMovieFormatUpdate(setError)

  const onSubmit: SubmitHandler<MovieFormatCreateInputType> = (data) => {
    if (movieFormatId) {
      updateMovieFormat(
        { id: movieFormatId as string, ...data },
        {
          onSuccess: () => router.push(`/movie-format/${movieFormatId}/detail`),
        },
      )
      return
    }

    createMovieFormat(data, {
      onSuccess: () => router.push('/movie-format'),
    })
  }

  return (
    <FormLayout
      title={movieFormatId ? 'Update' : 'Create'}
      onSubmit={handleSubmit(onSubmit)}
      isDirty={isDirty}
    >
      <Stack direction="row">
        <Stack spacing="1px" width={{ xs: '100%', lg: '960px' }}>
          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            gap={{
              xs: '1px',
              lg: 4,
            }}
            alignItems={{
              lg: 'center',
            }}
          >
            <DetailItem
              label="ID"
              value={movieFormatDetail?.id ? movieFormatDetail.id : '-'}
              valueSx={{ width: { xs: '100%', lg: 320 } }}
            />
          </Stack>
          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            gap={{
              xs: '1px',
              lg: 4,
            }}
          >
            <Input
              control={control}
              name="name"
              label="Name"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="Name"
            />
          </Stack>
          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            gap={{
              xs: '1px',
              lg: 4,
            }}
          >
            <DatePicker
              control={control}
              name="created_at"
              label="Created at"
              labelLeft
              width="320px"
              disabled={true}
              inputSx={{
                '&& .MuiOutlinedInput-input': {
                  fontWeight: 400 + ' !important',
                },
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
            />
          </Stack>
          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            gap={{
              xs: '1px',
              lg: 4,
            }}
          >
            <DatePicker
              control={control}
              name="updated_at"
              label="Updated at"
              labelLeft
              width="320px"
              disabled={true}
              inputSx={{
                '&& .MuiOutlinedInput-input': {
                  fontWeight: 400 + ' !important',
                },
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { MovieFormatForm }
