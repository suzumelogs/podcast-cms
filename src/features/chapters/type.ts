import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type ChapterType = {
  _id?: string
  name?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export type ChapterSearchInputType = PaginationType & {
  search?: string
  page?: string
}

export type ChapterListQueryInputType = ChapterSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type ChapterListType = PaginationType & {
  data: ChapterType[]
}

export type ChapterDetailType = {
  _id?: string
  name?: string
  description?: string
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
  name: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const ChapterUpdateInputSchema = ChapterCreateInputSchema.extend({
  _id: z.string(),
})

export type ChapterCreateInputType = TypeOf<typeof ChapterCreateInputSchema>
export type ChapterUpdateInputType = TypeOf<typeof ChapterUpdateInputSchema>
