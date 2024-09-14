import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export type BookType = {
  _id?: string
  name?: string
  author?: string
  description?: string
  url?: string
  isPremium?: string | boolean
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
}

export type BookDetailType = {
  _id?: string
  name?: string
  author?: string
  description?: string
  url?: string
  isPremium?: string | boolean
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
  name: z
    .string()
    .min(1, { message: 'Tên sách là bắt buộc' })
    .max(100, { message: 'Tên sách không được dài quá 100 ký tự' }),
  author: z
    .string()
    .min(1, { message: 'Tên tác giả là bắt buộc' })
    .max(100, { message: 'Tên tác giả không được dài quá 100 ký tự' }),
  description: z
    .string()
    .min(1, { message: 'Mô tả là bắt buộc' })
    .max(500, { message: 'Mô tả không được dài quá 500 ký tự' }),
  file: z
    .any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `Hình ảnh là bắt buộc và kích thước hình ảnh tối đa là 5MB.`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Chỉ hỗ trợ các định dạng .jpg, .jpeg, .png và .webp.',
    ),
  url: z.string().optional(),
  isPremium: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const BookUpdateInputSchema = BookCreateInputSchema.extend({
  _id: z.string().min(1, { message: 'ID sách là bắt buộc' }),
})

export type BookCreateInputType = TypeOf<typeof BookCreateInputSchema>
export type BookUpdateInputType = TypeOf<typeof BookUpdateInputSchema>
