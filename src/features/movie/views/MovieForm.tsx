'use client'

import { DetailItem } from '@/features/article/components'
import { DatePicker } from '@/libs/components/DatePicker'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMovieCreate, useMovieDetail, useMovieUpdate } from '../hooks'
import { MovieCreateInputSchema, MovieCreateInputType } from '../type'

const MovieForm = () => {
  const router = useRouter()
  const { moviesId } = useParams()
  const { data: movieDetail } = useMovieDetail(moviesId as string)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useForm<MovieCreateInputType>({
    defaultValues: {
      name: '',
      national: '',
      released_at: '',
      language_movie: '',
      duration: 0,
      limit_age: 0,
      brief_movie: '',
      trailer_movie: '',
      movie_type_id: 0,
      movie_format_id: 0,
      ticket_price: 0,
      created_at: '',
      updated_at: '',
      deleted_at: '',
    },
    resolver: zodResolver(MovieCreateInputSchema),
    values: {
      name: movieDetail?.name || '',
      national: movieDetail?.national || '',
      released_at: movieDetail?.released_at ? String(movieDetail.released_at) : '',
      language_movie: movieDetail?.language_movie || '',
      duration: movieDetail?.duration || 0,
      limit_age: movieDetail?.limit_age || 0,
      brief_movie: movieDetail?.brief_movie || '',
      trailer_movie: movieDetail?.trailer_movie || '',
      movie_type_id: movieDetail?.movie_type_id || 0,
      movie_format_id: movieDetail?.movie_format_id || 0,
      ticket_price: movieDetail?.ticket_price || 0,
      created_at: movieDetail?.created_at ? String(movieDetail.created_at) : '',
      updated_at: movieDetail?.updated_at ? String(movieDetail.updated_at) : '',
      deleted_at: movieDetail?.deleted_at ? String(movieDetail.deleted_at) : '',
    },
  })

  const { mutate: createMovie } = useMovieCreate(setError)
  const { mutate: updateMovie } = useMovieUpdate(setError)

  const onSubmit: SubmitHandler<MovieCreateInputType> = (data) => {
    if (moviesId) {
      updateMovie(
        { id: moviesId as string, ...data },
        {
          onSuccess: () => router.push(`/movies/${moviesId}/detail`),
        },
      )
      return
    }

    createMovie(data, {
      onSuccess: () => router.push('/movie'),
    })
  }

  console.log(movieDetail)

  return (
    <FormLayout
      title={moviesId ? 'Update' : 'Create'}
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
              value={movieDetail?.id ? movieDetail.id : '-'}
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
            <Input
              control={control}
              name="national"
              label="National"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="National"
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
              name="released_at"
              label="Released at"
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
            <Input
              control={control}
              name="national"
              label="National"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="National"
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
              name="national"
              label="National"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="National"
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
              name="national"
              label="National"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="National"
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
              name="national"
              label="National"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="National"
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
              name="national"
              label="National"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="National"
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
              name="national"
              label="National"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="National"
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
              name="national"
              label="National"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="National"
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
              name="national"
              label="National"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="National"
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

export { MovieForm }
