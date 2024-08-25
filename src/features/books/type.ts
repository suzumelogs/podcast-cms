import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type BookType = {
  _id?: string
  name?: string
  description?: string
  url?: string
  createdAt?: string
  updatedAt?: string
}

export type BookSearchInputType = PaginationType & {
  filter?: string
  page?: string
  next?: string
}

export type BookListQueryInputType = BookSearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type BookListType = {
  data: BookType[]
  pagination: PaginationType
} & PaginationType

export type BookDetailType = {
  _id?: string
  name?: string
  description?: string
  url?: string | undefined
  createdAt?: string
  updatedAt?: string
}

export type BookDetailResponseType = {
  data: BookDetailType
}

export type QueryInputBookDetailType = {
  bookId?: string
  sortBy?: string
  column?: string
}

export const BookCreateInputSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  file: z.instanceof(File).nullable(),
  url: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const BookUpdateInputSchema = BookCreateInputSchema.extend({
  _id: z.string(),
})

export type BookCreateInputType = TypeOf<typeof BookCreateInputSchema>
export type BookUpdateInputType = TypeOf<typeof BookUpdateInputSchema>
