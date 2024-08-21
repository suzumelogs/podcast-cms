'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { MovieSearchInputType } from '../type'

const MovieFilter = () => {
  const filterColumn: FilterColumn<ExVoid<MovieSearchInputType>>[] = [
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
  ]
  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        List
      </Typography>

      <FilterBar columns={filterColumn} createPath="movies/create" buttonSearchUnderButtonCreate />
    </Stack>
  )
}

export { MovieFilter }
