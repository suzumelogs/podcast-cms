'use client'

import { DetailItem } from '@/features/article/components'
import { DatePicker } from '@/libs/components/DatePicker'
import { FormLayout, Input } from '@/libs/components/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { usePersonCreate, usePersonDetail, usePersonUpdate } from '../hooks'
import { PersonCreateInputSchema, PersonCreateInputType } from '../type'

const PersonForm = () => {
  const router = useRouter()
  const { personId } = useParams()
  const { data: personDetail } = usePersonDetail(personId as string)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useForm<PersonCreateInputType>({
    defaultValues: {
      name: '',
      position: '',
      avatar: '',
      date_of_birth: '',
      biography: '',
      created_at: '',
      updated_at: '',
    },
    resolver: zodResolver(PersonCreateInputSchema),
    values: {
      name: personDetail?.name || '',
      position: personDetail?.position || '',
      avatar: personDetail?.avatar || '',
      date_of_birth: String(personDetail?.date_of_birth),
      biography: personDetail?.biography || '',
      created_at: String(personDetail?.created_at),
      updated_at: String(personDetail?.updated_at),
    },
  })

  const { mutate: createPerson } = usePersonCreate(setError)
  const { mutate: updatePerson } = usePersonUpdate(setError)

  const onSubmit: SubmitHandler<PersonCreateInputType> = (data) => {
    if (personId) {
      updatePerson(
        { id: personId as string, ...data },
        {
          onSuccess: () => {
            enqueueSnackbar('Updated successfully!', { variant: 'success' })
            router.push(`/person/${personId}/detail`)
          },
        },
      )
      return
    }

    createPerson(data, {
      onSuccess: () => {
        enqueueSnackbar('Created successfully!', { variant: 'success' })
        router.push('/person')
      },
    })
  }

  return (
    <FormLayout
      title={personId ? 'Update' : 'Create'}
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
              value={personDetail?.id ? personDetail.id : '-'}
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
              name="position"
              label="Position"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="Position"
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
              name="avatar"
              label="Avatar"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="Avatar"
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
              name="date_of_birth"
              label="Date of birth"
              labelLeft
              width="320px"
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
              name="biography"
              label="Biography"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="Biography"
              rows={4}
              multiline
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

export { PersonForm }
