'use client'

import { DetailItem } from '@/features/article/components'
import { DatePicker } from '@/libs/components/DatePicker'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMovieTypeCreate, useMovieTypeDetail, useMovieTypeUpdate } from '../hooks'
import { MovieTypeCreateInputSchema, MovieTypeCreateInputType } from '../type'

const MovieTypeForm = () => {
  const router = useRouter()
  const { movieTypeId } = useParams()
  const { data: movieTypeDetail } = useMovieTypeDetail(movieTypeId as string)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useForm<MovieTypeCreateInputType>({
    defaultValues: {
      name: '',
      created_at: '',
      updated_at: '',
    },
    resolver: zodResolver(MovieTypeCreateInputSchema),
    values: {
      name: movieTypeDetail?.name || '',
      created_at: String(movieTypeDetail?.created_at),
      updated_at: String(movieTypeDetail?.updated_at),
    },
  })

  const { mutate: createMovieType } = useMovieTypeCreate(setError)
  const { mutate: updateMovieType } = useMovieTypeUpdate(setError)

  const onSubmit: SubmitHandler<MovieTypeCreateInputType> = (data) => {
    if (movieTypeId) {
      updateMovieType(
        { id: movieTypeId as string, ...data },
        {
          onSuccess: () => router.push(`/movie-type/${movieTypeId}/detail`),
        },
      )
      return
    }

    createMovieType(data, {
      onSuccess: () => router.push('/movie-type'),
    })
  }

  return (
    <FormLayout
      title={movieTypeId ? 'Update' : 'Create'}
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
              value={movieTypeDetail?.id ? movieTypeDetail.id : '-'}
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

export { MovieTypeForm }
