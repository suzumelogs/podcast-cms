import { PaginationType } from '@/libs/types/pagination'
import { TypeOf, z } from 'zod'

export type CategoryType = {
  _id?: string
  name?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export type CategorySearchInputType = PaginationType & {
  search?: string
  page?: string
}

export type CategoryListQueryInputType = CategorySearchInputType & {
  column?: string
  sortBy?: 'asc' | 'desc'
}

export type CategoryListType = PaginationType & {
  data: CategoryType[]
}

export type CategoryDetailType = {
  id?: string
  name?: string
  description?: string
  imageUrl?: string
  createdAt?: string
  updatedAt?: string
}

export type CategoryDetailResponseType = {
  data: CategoryDetailType
}

export type QueryInputCategoryDetailType = {
  categoryId?: string
  sortBy?: string
  column?: string
}

export const CategoryCreateInputSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const CategoryUpdateInputSchema = CategoryCreateInputSchema.extend({
  id: z.string(),
})

export type MovieFormatCreateInputType = TypeOf<typeof CategoryCreateInputSchema>
export type MovieFormatUpdateInputType = TypeOf<typeof CategoryUpdateInputSchema>
