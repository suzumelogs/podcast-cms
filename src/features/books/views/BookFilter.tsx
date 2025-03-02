'use client'

import { useCategoryValueLabel } from '@/features/categories/hooks'
import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { BookSearchInputType } from '../type'

const BookFilter = () => {
  const { data: CATEGORIES } = useCategoryValueLabel()

  const filterColumn: FilterColumn<ExVoid<BookSearchInputType>>[] = [
    {
      field: 'name',
      type: 'text',
      placeholder: 'Tìm kiếm theo tên sách',
      defaultValue: '',
      sx: { width: 240 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: 'author',
      type: 'text',
      placeholder: 'Tìm kiếm theo tên tác giả',
      defaultValue: '',
      sx: { width: 240 },
    },
    {
      field: 'categoryId',
      type: 'select',
      options: CATEGORIES,
      placeholder: 'Tìm kiếm theo danh mục',
      defaultValue: '',
      sx: { width: 240 },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Danh sách sách
      </Typography>

      <FilterBar columns={filterColumn} createPath="books/create" buttonSearchUnderButtonCreate />
    </Stack>
  )
}

export { BookFilter }
