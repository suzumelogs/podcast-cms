'use client'

import {
  createCompanyUser,
  getCompany,
  getCompanyUser,
  updateCompanyUser,
} from '@/libs/api/company'
import { BreadcrumbType } from '@/libs/components/BreadCrumbs'
import { FormLayout, Input, InputPassword } from '@/libs/components/Form'
import { ErrorTypeResponse } from '@/libs/types/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CompanyUserCreateInputSchema, CompanyUserCreateInputType } from '../type'

const CompanyUserForm = () => {
  const { companyId, companyUserId } = useParams()
  const router = useRouter()
  const pathName = usePathname()
  const { data: companyUserDetail, isLoading: companyUserLoading } = useQuery({
    queryKey: ['company', companyUserId],
    queryFn: () => getCompanyUser(companyUserId as string),
    enabled: !!companyUserId,
  })

  const { data: companyDetail, isLoading: companyLoading } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => getCompany({ id: companyId as string }),
    enabled: !companyUserId,
  })

  const {
    control,
    handleSubmit,
    setError,
    watch,
    setValue,
    clearErrors,
    formState: { isDirty },
  } = useForm<CompanyUserCreateInputType>({
    defaultValues: {
      dept: '',
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      tel: '',
    },
    values: {
      dept: companyUserDetail?.dept,
      email: companyUserDetail?.email,
      name: companyUserDetail?.name,
      tel: companyUserDetail?.tel,
      password: '',
      password_confirmation: '',
    },
    resolver: zodResolver(CompanyUserCreateInputSchema),
  })

  const handleMutateError = (error: ErrorTypeResponse) => {
    const { data: responseData } = error.response || {}
    const errorValidation = responseData?.errors

    if (errorValidation) {
      if (errorValidation['name']) {
        setError('name', { message: errorValidation['name'] })
      }

      if (errorValidation['dept']) {
        setError('dept', { message: errorValidation['dept'] })
      }

      if (errorValidation['tel']) {
        setError('tel', { message: errorValidation['tel'] })
      }

      if (errorValidation['email']) {
        setError('email', { message: errorValidation['email'] })
      }

      if (errorValidation['password']) {
        setError('password', { message: errorValidation['password'] })
      }

      if (errorValidation['password_confirmation']) {
        setError('password_confirmation', {
          message: errorValidation['password_confirmation'],
        })
      }
    }
  }

  const { mutate: create, isPending: createPending } = useMutation({
    mutationFn: createCompanyUser,
    onSuccess: () => {
      router.push(`/company/${companyId}/detail`)
    },
    onError: handleMutateError,
  })

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationFn: updateCompanyUser,
    onSuccess: () => {
      router.push(`/company/${companyId}/detail`)
    },
    onError: handleMutateError,
  })

  const onSubmit: SubmitHandler<CompanyUserCreateInputType> = (data) => {
    if (companyUserId) {
      update({
        ...data,
        id: companyUserId as string,
      })
      return
    }

    create({ ...data, id: companyId as string })
  }

  const disabledConfirmPassword =
    pathName !== `/company/${companyId}/user/create` && !watch('password')

  useEffect(() => {
    if (disabledConfirmPassword) {
      clearErrors('password_confirmation')
      setValue('password_confirmation', '')
    }
  }, [disabledConfirmPassword, setValue, clearErrors])

  const pathBreadcrumb: BreadcrumbType[] = [
    {
      label: '不動産会社一覧',
      href: '/company',
    },
    {
      label: companyUserId
        ? (companyUserDetail?.company_name as string)
        : (companyDetail?.name as string),
      href: `/company/${companyId}/detail`,
    },
    {
      label: companyUserId ? (companyUserDetail?.name as string) : 'Create',
    },
  ]

  const closeFormPath = `/company/${companyId}/detail`

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={companyUserId ? '不動産会社担当者編集' : '不動産会社担当者登録'}
      isDirty={isDirty}
      pathArrCustom={pathBreadcrumb}
      isLoading={companyLoading || companyUserLoading}
      submitLoading={createPending || updatePending}
      closeFormPath={closeFormPath}
    >
      <Stack spacing="1px">
        <Stack spacing={1} direction="row" alignItems="center">
          <Stack
            height={44}
            minWidth={120}
            padding="4px 8px"
            bgcolor="base.white"
            justifyContent="center"
          >
            <Typography variant="body2" color="grey.500">
              担当者ID
            </Typography>
          </Stack>

          <Typography color="grey.600" variant="body2" fontWeight={400}>
            {companyUserId ? companyUserId : '-'}
          </Typography>
        </Stack>

        <Stack direction="row" gap={4}>
          <Input
            control={control}
            name="name"
            label="担当者名"
            labelLeft
            sx={{
              width: 320,
              fontWeight: 500,
              color: 'grey.500',
            }}
          />

          <Input
            control={control}
            name="dept"
            label="部署名"
            labelLeft
            sx={{
              width: 320,
              fontWeight: 500,
              color: 'grey.500',
            }}
          />
        </Stack>

        <Stack direction="row" gap={4}>
          <Input
            control={control}
            name="tel"
            label="携帯電話番号"
            labelLeft
            sx={{
              width: 320,
              fontWeight: 500,
              color: 'grey.500',
            }}
          />
          <Input
            control={control}
            name="email"
            label="メールアドレス"
            labelLeft
            sx={{
              width: 320,
              fontWeight: 500,
              color: 'grey.500',
            }}
            autoComplete="email"
          />
        </Stack>

        <Stack direction="row" gap={4}>
          <InputPassword
            control={control}
            autoComplete="new-password"
            name="password"
            label="パスワード"
            placeholder="変更する場合のみ入力してください"
            labelLeft
            sx={{
              width: 320,
              fontWeight: 500,
              color: 'grey.500',
            }}
          />
          <InputPassword
            control={control}
            autoComplete="new-password"
            name="password_confirmation"
            label="パスワード確認"
            placeholder="変更する場合のみ入力してください"
            labelLeft
            sx={{
              width: 320,
              fontWeight: 500,
              color: 'grey.500',
            }}
            disabled={disabledConfirmPassword}
          />
        </Stack>
      </Stack>
    </FormLayout>
  )
}

export { CompanyUserForm }
