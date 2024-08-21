import { PaginationType } from '@/libs/types/pagination'
import { string, TypeOf, z } from 'zod'

export type MovieType = {
  id?: number
  name?: string
  national?: string
  released_at?: string
  language_movie?: string
  duration?: number
  limit_age?: number
  brief_movie?: string
  trailer_movie?: string
  movie_type_id?: number
  movie_format_id?: number
  ticket_price?: number
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

export type MovieSearchInputType = {
  search?: string
  page?: string
  per_page?: string
} & PaginationType

export type MovieListQueryInputType = {
  column?: string
  sort_by?: 'asc' | 'desc'
} & MovieSearchInputType

export type MovieListType = {
  data: MovieType[]
} & PaginationType

export type MovieDetailType = {
  id?: number
  name?: string
  national?: string
  released_at?: string
  language_movie?: string
  duration?: number
  limit_age?: number
  brief_movie?: string
  trailer_movie?: string
  movie_type_id?: number
  movie_format_id?: number
  ticket_price?: number
  created_at?: string
  updated_at?: string
  deleted_at?: string
}

export type MovieDetailResponseType = {
  data: MovieDetailType
}

export type QueryInputMovieDetailType = {
  movieId?: string
  sort_by?: string
  column?: string
}

export const MovieCreateInputSchema = z.object({
  name: z.string().optional(),
  national: z.string().optional(),
  released_at: z.string().optional(),
  language_movie: z.string().optional(),
  duration: z.number().int().optional(),
  limit_age: z.number().int().optional(),
  brief_movie: z.string().optional(),
  trailer_movie: z.string().optional(),
  movie_type_id: z.number().int().optional(),
  movie_format_id: z.number().int().optional(),
  ticket_price: z.number().int().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  deleted_at: z.string().optional(),
})

export const MovieUpdateInputSchema = z
  .object({
    id: string(),
  })
  .merge(MovieCreateInputSchema)

export type MovieCreateInputType = TypeOf<typeof MovieCreateInputSchema>
export type MovieUpdateInputType = TypeOf<typeof MovieUpdateInputSchema>
