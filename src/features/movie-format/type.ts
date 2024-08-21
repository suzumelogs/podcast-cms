import { PaginationType } from '@/libs/types/pagination'
import { string, TypeOf, z } from 'zod'

export type MovieFormatType = {
  id?: string
  name?: string
  created_at?: string
  updated_at?: string
}

export type MovieFormatSearchInputType = {
  search?: string
  page?: string
  per_page?: string
} & PaginationType

export type MovieFormatListQueryInputType = {
  column?: string
  sort_by?: 'asc' | 'desc'
} & MovieFormatSearchInputType

export type MovieFormatListType = {
  data: MovieFormatType[]
} & PaginationType

export type MovieFormatDetailType = {
  id?: string
  name?: string
  created_at?: string
  updated_at?: string
}

export type MovieFormatDetailResponseType = {
  data: MovieFormatDetailType
}

export type QueryInputMovieFormatDetailType = {
  movieFormatId?: string
  sort_by?: string
  column?: string
}

export const MovieFormatCreateInputSchema = z.object({
  name: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export const MovieFormatUpdateInputSchema = z
  .object({
    id: string(),
  })
  .merge(MovieFormatCreateInputSchema)

export type MovieFormatCreateInputType = TypeOf<typeof MovieFormatCreateInputSchema>
export type MovieFormatUpdateInputType = TypeOf<typeof MovieFormatUpdateInputSchema>
