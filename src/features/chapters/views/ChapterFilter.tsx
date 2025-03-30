'use client'

import { useBookValueLabel } from '@/features/books/hooks'
import { useCategoryValueLabel } from '@/features/categories/hooks'
import { Input, Select } from '@/libs/components/Form'
import { ButtonSearch } from '@/libs/components/Table/styled'
import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TChapterSearch } from './ChapterList'

type TCategoryFilterProps = {
  search: TChapterSearch
  setSearch: (search: TChapterSearch) => void
}

const ChapterFilter: React.FC<TCategoryFilterProps> = ({ setSearch }) => {
  const { data: categories } = useCategoryValueLabel()
  const { control, handleSubmit, watch, setValue } = useForm<TChapterSearch>({
    defaultValues: {
      categoryId: null,
      bookId: null,
      name: null,
    },
  })

  const { data: books } = useBookValueLabel(watch('categoryId'))

  useEffect(() => {
    setValue('bookId', null)
  }, [watch('categoryId')])

  const onSubmit = handleSubmit((data) => {
    setSearch({
      bookId: data.bookId,
      categoryId: data.categoryId,
      name: data.name,
    })
  })

  console.log('CATEGORY', watch('bookId'))

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Danh sách chương
      </Typography>

      <Stack
        gap={3}
        flexDirection="row"
        alignItems="flex-start"
        component="form"
        onSubmit={onSubmit}
      >
        <Input
          control={control}
          name="name"
          placeholder="Tìm kiếm theo tên tập"
          sx={{ width: 240 }}
        />

        <Select
          control={control}
          name="categoryId"
          options={categories}
          sx={{ width: 240 }}
          placeholder="Tìm kiếm theo danh mục"
        />

        <Select
          control={control}
          name="bookId"
          options={books}
          disabled={!watch('categoryId')}
          sx={{ width: 240 }}
          placeholder="Tìm kiếm theo sách"
        />

        <ButtonSearch variant="outlined" type="submit">
          Tìm kiếm
        </ButtonSearch>
      </Stack>
    </Stack>
  )
}

export { ChapterFilter }
