'use client'

import { DetailItem } from '@/features/article/components'
import { DatePicker } from '@/libs/components/DatePicker'
import { Input, Select } from '@/libs/components/Form'
import { FormLayout } from '@/libs/components/Form/Layout/FormLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUserDetail, useUserUpdate } from '../hooks'
import { ACCOUNT_STATUS, ROLES } from '../options'
import { UserCreateInputSchema, UserCreateInputType } from '../type'

const UserForm = () => {
  const router = useRouter()
  const { userId } = useParams()
  const { data: userDetail } = useUserDetail(userId as string)

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = useForm<UserCreateInputType>({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      is_active: '',
      created_at: '',
      updated_at: '',
    },
    resolver: zodResolver(UserCreateInputSchema),
    values: {
      name: userDetail?.name,
      email: userDetail?.email,
      role: String(userDetail?.role),
      is_active: String(userDetail?.is_active),
      created_at: String(userDetail?.created_at),
      updated_at: String(userDetail?.updated_at),
    },
  })

  const { mutate: updateUser } = useUserUpdate(setError)

  const onSubmit: SubmitHandler<UserCreateInputType> = (data) => {
    if (userId) {
      updateUser(
        { id: userId as string, ...data },
        {
          onSuccess: () => router.push(`/users/${userId}/detail`),
        },
      )
      return
    }
  }

  return (
    <FormLayout
      title={userId ? 'Edit' : 'Create'}
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
              value={userDetail?.id ? userDetail.id : '-'}
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
              disabled={userId ? true : false}
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
              name="email"
              label="Email"
              labelLeft
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              placeholder="Email"
              disabled={userId ? true : false}
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
            <Select
              control={control}
              name="role"
              label="Role"
              labelLeft
              options={ROLES}
              placeholder="Role"
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              hiddenEmpty
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
            <Select
              control={control}
              name="is_active"
              label="Account status"
              labelLeft
              options={ACCOUNT_STATUS}
              placeholder="Account status"
              sx={{
                width: {
                  xs: '100%',
                  lg: 320,
                },
              }}
              hiddenEmpty
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
              disabled={userId ? true : false}
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
              disabled={userId ? true : false}
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

export { UserForm }
