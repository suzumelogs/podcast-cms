import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type ChapterType = {
  _id?: string
  name?: string
  description?: string
  url?: string
  createdAt?: string
  updatedAt?: string
}

export type ChapterSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type ChapterListQueryInputType = ChapterSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type ChapterListType = {
  data: ChapterType[]
  pagination: PaginationType
} & PaginationType

export type ChapterDetailType = {
  _id?: string
  name?: string
  description?: string
  url?: string | undefined
  createdAt?: string
  updatedAt?: string
}

export type ChapterDetailResponseType = {
  data: ChapterDetailType
}

export type QueryInputChapterDetailType = {
  chapterId?: string
  sortBy?: string
  column?: string
}

export const ChapterCreateInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Tên chương là bắt buộc' })
    .max(100, { message: 'Tên chương không được dài quá 100 ký tự' }),

  description: z
    .string()
    .min(1, { message: 'Mô tả là bắt buộc' })
    .max(500, { message: 'Mô tả không được dài quá 500 ký tự' }),
  file: z.instanceof(File).nullable(),
  url: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const ChapterUpdateInputSchema = ChapterCreateInputSchema.extend({
  _id: z.string(),
})

export type ChapterCreateInputType = TypeOf<typeof ChapterCreateInputSchema>
export type ChapterUpdateInputType = TypeOf<typeof ChapterUpdateInputSchema>
