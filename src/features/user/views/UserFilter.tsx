'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { UserSearchInputType } from '..'
import { ACCOUNT_STATUS, ROLES } from '../options'

export function UserFilter() {
  const filterColumn: FilterColumn<ExVoid<UserSearchInputType>>[] = [
    {
      field: 'search',
      type: 'text',
      placeholder: 'Search',
      defaultValue: '',
      sx: { width: 240 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: 'role',
      type: 'select',
      placeholder: 'Role...',
      defaultValue: '',
      options: ROLES,
      label: 'Role',
      sx: { width: 240 },
      fieldOptions: {
        groupField: true,
      },
    },
    {
      field: 'is_active',
      type: 'select',
      placeholder: 'Account status...',
      defaultValue: '',
      options: ACCOUNT_STATUS,
      label: 'Status',
      sx: { width: 240 },
      fieldOptions: {
        groupField: true,
      },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        List
      </Typography>

      <FilterBar
        columns={filterColumn}
        createPath="users/create"
        isDisabledCreate={true}
        buttonSearchUnderButtonCreate
      />
    </Stack>
  )
}
