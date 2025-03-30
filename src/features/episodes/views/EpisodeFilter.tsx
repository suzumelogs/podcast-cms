'use client'

import { useBookValueLabel } from '@/features/books/hooks'
import { useCategoryValueLabel } from '@/features/categories/hooks'
import { useChapterValueLabel } from '@/features/chapters/hooks/useChapterValueLabel'
import { Input, Select } from '@/libs/components/Form'
import { ButtonSearch } from '@/libs/components/Table/styled'
import { Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TSearch } from './EpisodeList'

type TEpisodeFilterProps = {
  search: TSearch
  setSearch: (search: TSearch) => void
}

const EpisodeFilter: React.FC<TEpisodeFilterProps> = ({ setSearch }) => {
  const { data: categories } = useCategoryValueLabel()
  const { control, handleSubmit, watch, setValue } = useForm<TSearch>({
    defaultValues: {
      categoryId: null,
      bookId: null,
      chapterId: null,
      author: null,
      name: null,
    },
  })

  const { data: books } = useBookValueLabel(watch('categoryId'))
  const { data: chapters } = useChapterValueLabel(watch('bookId'))

  useEffect(() => {
    setValue('bookId', null)
    setValue('chapterId', null)
  }, [watch('categoryId')])

  useEffect(() => {
    setValue('chapterId', null)
  }, [watch('bookId')])

  const onSubmit = handleSubmit((data) => {
    setSearch({
      bookId: data.bookId,
      categoryId: data.categoryId,
      chapterId: data.chapterId,
      name: data.name,
      author: data.author,
    })
  })

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Danh sách tập
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

        <Input
          control={control}
          name="author"
          placeholder="Tìm kiếm theo tác giả"
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

        <Select
          control={control}
          name="chapterId"
          options={chapters}
          sx={{ width: 240 }}
          disabled={!watch('bookId') || !watch('categoryId')}
          placeholder="Tìm kiếm theo chương"
        />

        <ButtonSearch variant="outlined" type="submit">
          Tìm kiếm
        </ButtonSearch>
      </Stack>
    </Stack>
  )
}

export { EpisodeFilter }
