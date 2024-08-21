import { PaginationType } from '@/libs/types/pagination'
import { string, TypeOf, z } from 'zod'

export type MovieTypeType = {
  id?: string
  name?: string
  created_at?: string
  updated_at?: string
}

export type MovieTypeSearchInputType = {
  search?: string
  page?: string
  per_page?: string
} & PaginationType

export type MovieTypeListQueryInputType = {
  column?: string
  sort_by?: 'asc' | 'desc'
} & MovieTypeSearchInputType

export type MovieTypeListType = {
  data: MovieTypeType[]
} & PaginationType

export type MovieTypeDetailType = {
  id?: string
  name?: string
  created_at?: string
  updated_at?: string
}

export type MovieTypeDetailResponseType = {
  data: MovieTypeDetailType
}

export type QueryInputMovieTypeDetailType = {
  movieTypeId?: string
  sort_by?: string
  column?: string
}

export const MovieTypeCreateInputSchema = z.object({
  name: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export const MovieTypeUpdateInputSchema = z
  .object({
    id: string(),
  })
  .merge(MovieTypeCreateInputSchema)

export type MovieTypeCreateInputType = TypeOf<typeof MovieTypeCreateInputSchema>
export type MovieTypeUpdateInputType = TypeOf<typeof MovieTypeUpdateInputSchema>
