'use client'

import { useBookValueLabel } from '@/features/books/hooks'
import { useCategoryValueLabel } from '@/features/categories/hooks'
import { useChapterValueLabel } from '@/features/chapters/hooks/useChapterValueLabel'
import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { EpisodeSearchInputType } from '../type'

const EpisodeFilter = () => {
  const { data: categories } = useCategoryValueLabel()
  const { data: books } = useBookValueLabel()
  const { data: chapters } = useChapterValueLabel()

  const filterColumn: FilterColumn<ExVoid<EpisodeSearchInputType>>[] = [
    {
      field: 'name',
      type: 'text',
      placeholder: 'Tìm kiếm theo tên tập',
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
      placeholder: 'Tìm kiếm theo tác giả',
      defaultValue: '',
      sx: { width: 240 },
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
    {
      field: 'chapterId',
      type: 'select',
      options: chapters,
      placeholder: 'Tìm kiếm theo chương',
      defaultValue: '',
      sx: { width: 240 },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Danh sách tập
      </Typography>

      <FilterBar
        columns={filterColumn}
        createPath="episodes/create"
        buttonSearchUnderButtonCreate
      />
    </Stack>
  )
}

export { EpisodeFilter }
