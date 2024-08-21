import { PaginationType } from '@/libs/types/pagination'
import { string, TypeOf, z } from 'zod'

export type PersonType = {
  id?: string
  name?: string
  position?: string
  avatar?: string
  date_of_birth?: string
  biography?: string
  created_at?: string
  updated_at?: string
}

export type PersonSearchInputType = {
  search?: string
  page?: string
  per_page?: string
} & PaginationType

export type PersonListQueryInputType = {
  column?: string
  sort_by?: 'asc' | 'desc'
} & PersonSearchInputType

export type PersonListType = {
  data: PersonType[]
} & PaginationType

export type PersonDetailType = {
  id?: string
  name?: string
  position?: string
  avatar?: string
  date_of_birth?: string
  biography?: string
  created_at?: string
  updated_at?: string
}

export type PersonDetailResponseType = {
  data: PersonDetailType
}

export type QueryInputPersonDetailType = {
  personId?: string
  sort_by?: string
  column?: string
}

export const PersonCreateInputSchema = z.object({
  name: z.string().optional(),
  position: z.string().optional(),
  avatar: z.string().optional(),
  date_of_birth: z.string().or(z.date()).optional(),
  biography: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export const PersonUpdateInputSchema = z
  .object({
    id: string(),
  })
  .merge(PersonCreateInputSchema)

export type PersonCreateInputType = TypeOf<typeof PersonCreateInputSchema>
export type PersonUpdateInputType = TypeOf<typeof PersonUpdateInputSchema>
