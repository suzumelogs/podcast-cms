'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { MovieTypeSearchInputType } from '../type'

const MovieTypeFilter = () => {
  const filterColumn: FilterColumn<ExVoid<MovieTypeSearchInputType>>[] = [
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

      <FilterBar
        columns={filterColumn}
        createPath="movie-type/create"
        buttonSearchUnderButtonCreate
      />
    </Stack>
  )
}

export { MovieTypeFilter }
