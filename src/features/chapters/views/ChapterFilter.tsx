'use client'

import { useBookValueLabel } from '@/features/books/hooks'
import { useCategoryValueLabel } from '@/features/categories/hooks'
import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { ChapterSearchInputType } from '../type'

const ChapterFilter = () => {
  const { data: categories } = useCategoryValueLabel()
  const { data: books } = useBookValueLabel()

  const filterColumn: FilterColumn<ExVoid<ChapterSearchInputType>>[] = [
    {
      field: 'name',
      type: 'text',
      placeholder: 'Tìm kiếm theo tên chương',
      defaultValue: '',
      sx: { width: 240 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: 'categoryId',
      type: 'select',
      options: categories,
      placeholder: 'Tìm kiếm theo danh mục',
      defaultValue: '',
      sx: { width: 240 },
    },
    {
      field: 'bookId',
      type: 'select',
      options: books,
      placeholder: 'Tìm kiếm theo sách',
      defaultValue: '',
      sx: { width: 240 },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Danh sách chương
      </Typography>

      <FilterBar
        columns={filterColumn}
        createPath="chapters/create"
        buttonSearchUnderButtonCreate
      />
    </Stack>
  )
}

export { ChapterFilter }
